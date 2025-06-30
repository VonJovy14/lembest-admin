import { useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth2, db } from "../../utils/firebase";
import { doc, setDoc } from "firebase/firestore";

import { formatSelectData } from "../../middleware/hooks/FormatData";

import { UserData } from "../../constant/Authentication";
import { AccessLevelData } from "../../constant/Authentication";

import { TextField } from "../../components/input/TextField";
import { FormContainer } from "../Container";
import { confirmDialog, autoCloseAlert } from "../../components/display/Alert";
import Select from "../../components/input/Select";

import Swal from "sweetalert2";
import Grid from "@mui/material/Grid";

function AuthenticationSignUp({ admin }) {
  const [newUserData, setNewUserData] = useState({ ...UserData });

  const handleUserDataChange = (e) => {
    setNewUserData({ ...newUserData, [e.target.name]: e.target.value });
  };

  const onSignUpSubmit = (e) => {
    e.preventDefault();

    let result = "";

    createUserWithEmailAndPassword(
      auth2,
      newUserData.email,
      newUserData.password
    ).then(async (userCredentials) => {
      const user = await userCredentials.user;

      result = await confirmDialog({
        text: "You're saving a new user!",
        confirmButtonText: "Yes, save new user",
      });

      if (result.isConfirmed) {
        try {
          setDoc(doc(db, "users", user.uid), newUserData);

          setNewUserData({ ...UserData });

          await autoCloseAlert({
            text: "New user has been save.",
          });
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
    });
  };

  return (
    <div className="authentication-sign-up-container">
      <FormContainer button="Sign Up" onFormSubmit={(e) => onSignUpSubmit(e)}>
        <Grid container spacing={1}>
          <Grid size={7}>
            <TextField
              type="email"
              label="Email"
              value={newUserData.email}
              onChange={(e) => handleUserDataChange(e)}
            />
          </Grid>

          <Grid size={5}>
            <TextField
              type="password"
              label="Password"
              value={newUserData.password}
              onChange={(e) => handleUserDataChange(e)}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              label="First Name"
              value={newUserData.first_name}
              onChange={(e) => handleUserDataChange(e)}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              label="Last Name"
              value={newUserData.last_name}
              onChange={(e) => handleUserDataChange(e)}
            />
          </Grid>

          {admin ? (
            <Grid size={"grow"}>
              <Select
                label="Access Level"
                data={formatSelectData(AccessLevelData)}
                value={newUserData.access_level}
                onSelectChange={(e) => handleUserDataChange(e)}
              />
            </Grid>
          ) : null}
        </Grid>
      </FormContainer>
    </div>
  );
}

export { AuthenticationSignUp };
