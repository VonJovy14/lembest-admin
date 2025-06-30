import { formatNumberBack } from "./FormatData";

export const useAccountPayable = (apData, expensesData) => {
  const calculateAccountExpenseSum = (expenseData) => {
    return Object.values(expenseData).reduce((sum, vendorItem) => {
      const apId = vendorItem.id;

      const totalExpenses = Object.values(expensesData)
        .filter(
          (expense) => expense.ap_id === apId && expense.status === "CLEARED"
        )
        .reduce(
          (subSum, expense) => subSum + formatNumberBack(expense.amount),
          0
        );

      return sum + totalExpenses;
    }, 0);
  };

  const calculatePastDueBalance = (vendorId) => {
    const today = new Date().toISOString().split("T")[0];

    const outstanding = Object.values(apData).filter(
      (item) => item.vendor_id === vendorId && item.due_date < today
    );

    const total = outstanding.reduce((sum, item) => {
      return sum + formatNumberBack(item.grand_total);
    }, 0);

    return total - calculateAccountExpenseSum(outstanding);
  };

  const calculateCurrentBalance = (vendorId) => {
    const today = new Date().toISOString().split("T")[0];

    const current = Object.values(apData).filter(
      (item) => item.vendor_id === vendorId && item.due_date >= today
    );

    const total = current.reduce((sum, item) => {
      return sum + formatNumberBack(item.grand_total);
    }, 0);

    return total - calculateAccountExpenseSum(current);
  };

  const calculateAgingOutstandingBalance = ({
    vendorId,
    minDays = 1,
    maxDays,
  }) => {
    const today = new Date();

    const filtered = Object.values(apData).filter((item) => {
      if (!item.due_date || item.vendor_id !== vendorId) return false;

      const dueDate = new Date(item.due_date);
      const diffInDays = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));

      const isOverdue = dueDate < today;
      const isInRange = maxDays
        ? diffInDays >= minDays && diffInDays <= maxDays
        : diffInDays >= minDays;

      return isOverdue && isInRange;
    });

    const total = filtered.reduce((sum, item) => {
      return sum + formatNumberBack(item.grand_total);
    }, 0);

    return total - calculateAccountExpenseSum(filtered);
  };

  const calculateApBalance = (apId) => {
    const apItem = apData.find((item) => item.id === apId);
    if (!apItem) return 0;

    const total = formatNumberBack(apItem.grand_total);

    const clearedExpenses = Object.values(expensesData)
      .filter(
        (expense) => expense.ap_id === apId && expense.status === "CLEARED"
      )
      .reduce((sum, expense) => sum + formatNumberBack(expense.amount), 0);

    return total - clearedExpenses;
  };

  return {
    calculatePastDueBalance,
    calculateCurrentBalance,
    calculateAgingOutstandingBalance,
    calculateApBalance,
  };
};
