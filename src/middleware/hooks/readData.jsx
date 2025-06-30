import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { doc, collection, getDocs, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";

import {
  fetchVendorDataAction,
  fetchPurchaseOrderAction,
} from "../action/Vendors";
import { fetchAccountPayableDataAction } from "../action/AccountPayable";
import { fetchAccountsDataAction } from "../action/Accounts";
import { fetchExpensesDataAction } from "../action/Expenses";

const fetchCollection = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching supplier data:", error.message);
    return [];
  }
};

const fetchData = async (collectionName, uid) => {
  try {
    const docRef = doc(db, collectionName, uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.warn("📭 No document found.");
      return null;
    }
  } catch (error) {
    console.error("❌ Error fetching document:", error.message);
    return null;
  }
};

const getAndDispatchData = async (dispatch) => {
  const supplierData = await fetchCollection("vendors");
  await dispatch(fetchVendorDataAction(supplierData));

  const deliveriesData = await fetchCollection("account_payable");
  await dispatch(fetchAccountPayableDataAction(deliveriesData));

  const purchaseOrderData = await fetchCollection("purchase_orders");
  await dispatch(fetchPurchaseOrderAction(purchaseOrderData));

  const accountsData = await fetchCollection("accounts");
  await dispatch(fetchAccountsDataAction(accountsData));

  const expensesData = await fetchCollection("expenses");
  await dispatch(fetchExpensesDataAction(expensesData));
};

const useReadData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getAndDispatchData(dispatch);
  }, [dispatch]);
};

export { useReadData, fetchData };
