import { useState } from "react";
import { useDispatch } from "react-redux";

import { db } from "../../utils/firebase";
import { addDoc, collection } from "firebase/firestore";

import { addVendorData } from "../../middleware/reducers/Vendors";

import { vendorData } from "../../constant/Vendor";

import { FormContainer } from "../Container";
import { TextField, NumberField } from "../../components/input/TextField";
import { confirmDialog, autoCloseAlert } from "../../components/display/Alert";

import Grid from "@mui/material/Grid";
import Swal from "sweetalert2";

function VendorAdd() {
  const dispatch = useDispatch();
  const [vendor, setVendor] = useState({ ...vendorData });

  const handleVendorDataChange = (e) => {
    setVendor({ ...vendor, [e.target.name]: e.target.value });
  };

  const handleNewVendorSubmit = async (e) => {
    e.preventDefault();

    let result = await confirmDialog({
      text: "You're saving " + vendor.name + " as new vendor!",
      confirmButtonText: "Yes, save new vendor",
    });

    if (result.isConfirmed) {
      try {
        const doc = await addDoc(collection(db, "vendors"), vendor);
        dispatch(addVendorData({ ...vendor, id: doc.id }));

        await autoCloseAlert({
          text: "New vendor has been save.",
        });

        await setVendor({ ...vendorData });
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
    <div className="vendor-add-container">
      <FormContainer
        button="save vendor"
        onFormSubmit={(e) => handleNewVendorSubmit(e)}
      >
        <Grid container columnSpacing={1}>
          <Grid size={8}>
            <TextField
              label="Name"
              value={vendor.name}
              onChange={(e) => handleVendorDataChange(e)}
            />
          </Grid>

          <Grid size="grow">
            <NumberField
              label="Terms"
              unit="days"
              value={vendor.terms}
              onChange={(e) => handleVendorDataChange(e)}
            />
          </Grid>

          <Grid size={7}>
            <TextField
              label="Contact Person"
              value={vendor.contact_person}
              onChange={(e) => handleVendorDataChange(e)}
            />
          </Grid>

          <Grid size={5}>
            <TextField
              type="number"
              label="Contact Number"
              value={vendor.contact_number}
              onChange={(e) => handleVendorDataChange(e)}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              label="Address"
              value={vendor.address}
              onChange={(e) => handleVendorDataChange(e)}
            />
          </Grid>
        </Grid>
      </FormContainer>
    </div>
  );
}

export default VendorAdd;
