import { db } from "../../utils/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";

import { autoCloseAlert, confirmDialog } from "../../components/display/Alert";
import Swal from "sweetalert2";

import {
  readInventoryData,
  createNewInventoryItem,
} from "../reducers/Inventory";

export const readInventoryDataAction = (inventoryData) => (dispatch) => {
  dispatch(readInventoryData(inventoryData));
};

export const createNewInventoryItemAction =
  (inventoryData) => async (dispatch) => {
    let result = "";

    result = await confirmDialog({
      text: "You're saving a new item in the inventory!",
      confirmButtonText: "Yes, save new item",
    });

    if (result.isConfirmed) {
      try {
        const doc = await addDoc(collection(db, "inventory"), inventoryData);
        await dispatch(
          createNewInventoryItem({ ...inventoryData, id: doc.id })
        );

        await autoCloseAlert({
          text: "New item has been added to the inventory.",
        });
        return { success: true };
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
