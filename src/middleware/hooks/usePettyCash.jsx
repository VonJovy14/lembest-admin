import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDoc, collection, Timestamp } from "firebase/firestore";

import { db } from "../../utils/firebase";
import { addExpensesData } from "../../middleware/reducers/Expenses";
import {
  formatNumber,
  formatNumberBack,
} from "../../middleware/hooks/FormatData";
import { PettyCashItem } from "../../constant/PettyCash";
import { confirmDialog, autoCloseAlert } from "../../components/display/Alert";
import Swal from "sweetalert2";

export const usePettyCash = ({ id, balance, dueDate }) => {
  const dispatch = useDispatch();
  const accountsData = useSelector((state) => state.accounts);
  const [pettyCash, setPettyCash] = useState({});

  const handleNewPettyCashItem = (mop) => {
    const newKey = Date.now();
    let formatItem = { ...PettyCashItem, mode_of_payment: mop, ap_id: id };

    if (mop === "cash") {
      formatItem.reference_number = "Cash";
      formatItem.account = "DHy97zB6UFdotVThHkfc";
    } else if (mop === "check") {
      formatItem.status = "PENDING";
    }

    setPettyCash((prev) => ({
      ...prev,
      [newKey]: formatItem,
    }));
  };

  const handleCheckChange = (key, field, value) => {
    setPettyCash((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  const handleDeleteCheckItem = (key) => {
    setPettyCash((prev) => {
      const { [key]: _, ...rest } = prev;
      return rest;
    });
  };

  const handleBankSelection = (mop) => {
    if (mop === "cash") {
      return accountsData.filter((a) => a.id === "DHy97zB6UFdotVThHkfc");
    } else {
      return accountsData.filter((a) => a.id !== "DHy97zB6UFdotVThHkfc");
    }
  };

  const _renderMOPNumber = (mop) =>
    ({
      check: "Check Number",
      cash: "Cash Payment",
    })[mop] || "Reference Number";

  const calculatePettyCashTotal = () => {
    return Object.values(pettyCash).reduce((total, item) => {
      return total + formatNumberBack(item.amount);
    }, 0);
  };

  const splitBalance = () => {
    const keys = Object.keys(pettyCash);
    const count = keys.length;

    if (count === 0 || !dueDate) return;

    const baseAmount = Math.floor((balance / count) * 100) / 100;
    const totalBase = baseAmount * count;
    const remainder = parseFloat((balance - totalBase).toFixed(2));

    const finalDueDate = new Date(dueDate);
    const today = new Date();
    const totalDays = Math.max(
      0,
      Math.floor((finalDueDate - today) / (1000 * 60 * 60 * 24))
    );

    const updated = {};

    keys.forEach((key, index) => {
      let amount = baseAmount;
      if (index === count - 1) {
        amount += remainder;
      }

      const offsetDays = Math.floor((totalDays / count) * index);
      const due = new Date(today);
      due.setDate(today.getDate() + offsetDays);

      updated[key] = {
        ...pettyCash[key],
        amount: formatNumber(amount.toFixed(2)),
        date: due.toISOString().split("T")[0],
      };
    });

    setPettyCash(updated);
  };

  const handlePettyCashSubmit = async (e) => {
    e.preventDefault();
    document.activeElement?.blur();

    if (Object.keys(pettyCash).length === 0) {
      return autoCloseAlert({
        icon: "error",
        title: "Oops!",
        text: "Petty Cash is empty, my dude.",
        timer: 2500,
      });
    }

    const result = await confirmDialog({
      text: "You're saving a new Petty Cash!",
      confirmButtonText: "Yes, save it",
    });

    if (result.isConfirmed) {
      try {
        const items = Object.values(pettyCash);
        await Promise.all(
          items.map(async (item) => {
            const doc = await addDoc(collection(db, "expenses"), item);
            dispatch(addExpensesData({ ...item, id: doc.id }));
          })
        );
        setPettyCash({});
        await autoCloseAlert({ text: "Your Petty Cash has been saved!" });
      } catch (err) {
        console.error("🔥 Firestore error:", err);
        Swal.fire("Error!", "Something went wrong saving your data.", "error");
      }
    } else {
      Swal.fire("Cancelled", "Changes were not saved", "info");
    }
  };

  return {
    pettyCash,
    handleNewPettyCashItem,
    handleCheckChange,
    handleDeleteCheckItem,
    handlePettyCashSubmit,
    handleBankSelection,
    calculatePettyCashTotal,
    splitBalance,
    _renderMOPNumber,
  };
};
