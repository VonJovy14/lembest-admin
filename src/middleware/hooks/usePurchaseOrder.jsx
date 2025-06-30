// 📁 src/hooks/usePurchaseOrder.js
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../utils/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { addNewAccountPayable } from "../../middleware/reducers/AccountPayable";
import { addPurchaseOrderData } from "../../middleware/reducers/Vendors";
import {
  formatNumber,
  formatNumberBack,
} from "../../middleware/hooks/FormatData";
import { poItem } from "../../constant/Vendor";
import { autoCloseAlert, confirmDialog } from "../../components/display/Alert";
import Swal from "sweetalert2";

export const usePurchaseOrder = () => {
  const dispatch = useDispatch();
  const vendorData = useSelector((state) => state.vendor.vendorData);

  const [poData, setPoData] = useState({
    vendorId: "",
    date: new Date().toISOString().split("T")[0],
    drNumber: "",
  });

  const [poItems, setPoItems] = useState({});
  const [charges, setCharges] = useState({ discount: 0, wTax: 0 });

  const handleNewItem = () => {
    const newKey = Date.now();
    setPoItems((prev) => ({
      ...prev,
      [newKey]: { ...poItem },
    }));
  };

  const handleItemChange = (key, field, value) => {
    setPoItems((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  const handleChargesChange = (field, value) => {
    setCharges((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDeletePoItem = (key) => {
    setPoItems((prev) => {
      const { [key]: _, ...rest } = prev;
      return rest;
    });
  };

  const calculatePoTotal = () => {
    return Object.values(poItems).reduce((total, item) => {
      const quantity = formatNumberBack(item.quantity);
      const unitPrice = formatNumberBack(item.unit_price);
      return total + quantity * unitPrice;
    }, 0);
  };

  const calculateDueDate = () => {
    const vendor = vendorData.find((v) => v.id === poData.vendorId);
    if (!vendor) return null;
    const terms = Number(vendor.terms);
    const baseDate = new Date(poData.date);
    baseDate.setDate(baseDate.getDate() + terms);
    return baseDate.toISOString().split("T")[0];
  };

  const submitPurchaseOrder = async (data) => {
    const doc = await addDoc(collection(db, "purchase_orders"), data);
    dispatch(addPurchaseOrderData({ ...data, id: doc.id }));
    return doc.id;
  };

  const submitAccountPayable = async (data) => {
    const doc = await addDoc(collection(db, "account_payable"), data);
    dispatch(addNewAccountPayable({ ...data, id: doc.id }));
  };

  const resetForm = async () => {
    setPoData({
      vendorId: "",
      date: new Date().toISOString().split("T")[0],
      drNumber: "",
    });
    setPoItems({});
    setCharges({ discount: 0, wTax: 0 });
    await new Promise((res) => setTimeout(res, 0));
  };

  const handlePoSubmit = async (e) => {
    e.preventDefault();
    document.activeElement?.blur();

    let result = "";
    const total = calculatePoTotal();
    const dueDate = calculateDueDate();
    const discount = formatNumberBack(charges.discount);
    const wTax = formatNumberBack(charges.wTax);
    const grandTotal = total - discount + wTax;

    const baseData = {
      vendor_id: poData.vendorId,
      date: poData.date,
      createdAt: Timestamp.now(),
      dr_number: poData.drNumber,
    };

    if (Object.keys(poItems).length === 0) {
      autoCloseAlert({
        icon: "error",
        title: "Sorry!",
        text: "It seems your particulars is empty.",
        timer: 2500,
      });
      return;
    }

    result = await confirmDialog({
      text: "You're saving a new PO!",
      confirmButtonText: "Yes, save new PO",
    });

    if (result.isConfirmed) {
      try {
        const poId = await submitPurchaseOrder({
          ...baseData,
          items: poItems,
          total: formatNumber(total),
          discount: charges.discount,
          wTax: charges.wTax,
        });

        await submitAccountPayable({
          ...baseData,
          purchase_order_id: poId,
          grand_total: formatNumber(grandTotal),
          due_date: dueDate,
        });

        resetForm();

        await autoCloseAlert({ text: "Your PO has been saved." });
      } catch (error) {
        console.error("🔥 Firestore error:", error);
        await Swal.fire(
          "Error!",
          "Something went wrong saving your PO.",
          "error"
        );
      }
    } else if (result.isDenied) {
      await Swal.fire("Cancelled", "Changes are not saved", "info");
    }
  };

  return {
    poData,
    setPoData,
    poItems,
    charges,
    handleNewItem,
    handleItemChange,
    handleChargesChange,
    handleDeletePoItem,
    calculatePoTotal,
    handlePoSubmit,
    vendorData,
  };
};
