import { useState } from "react";
import { useDispatch } from "react-redux";

import { db } from "../../utils/firebase";
import { addDoc, collection } from "firebase/firestore";

import { addAccountsData } from "../../middleware/reducers/Accounts";

import { AccountsData } from "../../constant/Accounts";

import { TextField } from "../../components/input/TextField";
import { FormContainer } from "../Container";
import { confirmDialog, autoCloseAlert } from "../../components/display/Alert";

import Swal from "sweetalert2";

function AccountsAdd() {
  const dispatch = useDispatch();
  const [newAccountData, setNewAccountData] = useState({ ...AccountsData });

  const handleAccountDataChange = (e) => {
    setNewAccountData({ ...newAccountData, [e.target.name]: e.target.value });
  };

  const handleSubmitNewAccount = async (e) => {
    e.preventDefault();

    let result = await confirmDialog({
      text: "You're saving " + newAccountData.bank_code + " as new account!",
      confirmButtonText: "Yes, save new account",
    });

    if (result.isConfirmed) {
      try {
        const doc = await addDoc(collection(db, "accounts"), newAccountData);
        dispatch(addAccountsData({ ...newAccountData, id: doc.id }));

        await autoCloseAlert({
          text: "New vendor has been save.",
        });

        await setNewAccountData({ ...AccountsData });
      } catch (error) {
        console.error("🔥 Firestore error:", error);
        await Swal.fire(
          "Error!",
          "Something went wrong saving new vendor.",
          "error"
        );
      }
    } else if (result.isDenied) {
      await Swal.fire("Cancelled", "Changes are not saved", "info");
    }
  };

  return (
    <FormContainer
      button="Add new Account"
      onFormSubmit={(e) => handleSubmitNewAccount(e)}
    >
      <TextField
        type="text"
        label="Name"
        value={newAccountData.name}
        onChange={(e) => handleAccountDataChange(e)}
      />

      <TextField
        type="text"
        label="Account Number"
        value={newAccountData.account_number}
        onChange={(e) => handleAccountDataChange(e)}
      />

      <TextField
        type="text"
        label="Account Name"
        value={newAccountData.account_name}
        onChange={(e) => handleAccountDataChange(e)}
      />
    </FormContainer>
  );
}

export default AccountsAdd;
