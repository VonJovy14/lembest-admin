import { fetchExpensesData, updateExpensesData } from "../reducers/Expenses";

export const fetchExpensesDataAction = (pettyCashData) => (dispatch) => {
  dispatch(fetchExpensesData(pettyCashData));
};

export const updateExpensesDataAction =
  (updatedExpense) => (dispatch, getState) => {
    const expenses = getState().expenses;

    const updatedExpenses = expenses.map((exp) =>
      exp.id === updatedExpense.id ? { ...exp, ...updatedExpense } : exp
    );

    dispatch(updateExpensesData(updatedExpenses));
  };
