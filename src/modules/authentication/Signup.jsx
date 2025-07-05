import { useState } from "react";
import { useDispatch } from "react-redux";

import { NewUserData } from "../../constant/Authentication";

import { updateFormFieldArray } from "../../helper/useDataChange";
import { registerUserAction } from "../../middleware/action/Users";

import { TextField } from "../../components/input/TextField";
import { FormContainer } from "../../components/display/Container";
import { autoCloseAlert } from "../../components/display/Alert";

import { Grid } from "@mui/material";

function Signup() {
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState({ ...NewUserData });
  const [loading, setLoading] = useState(false);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await dispatch(registerUserAction(newUser));

    setLoading(false);

    if (result?.success) {
      setNewUser({ ...NewUserData });

      await autoCloseAlert({
        text: "Welcome to Lembest admin.",
      });
    }
  };

  return (
    <div className="signup-modules-container">
      <FormContainer
        button="submit"
        onFormSubmit={handleSignupSubmit}
        loading={loading}
      >
        <Grid container columnSpacing={1}>
          <Grid size={{ xs: 12, mdlg: 7 }}>
            <TextField
              label="Email"
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser(updateFormFieldArray(newUser, e))}
            />
          </Grid>

          <Grid size={{ xs: 12, mdlg: 5 }}>
            <TextField
              label="Password"
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser(updateFormFieldArray(newUser, e))}
            />
          </Grid>

          <Grid size={{ xs: 12, mdlg: 6 }}>
            <TextField
              label="First Name"
              value={newUser.first_name}
              onChange={(e) => setNewUser(updateFormFieldArray(newUser, e))}
            />
          </Grid>

          <Grid size={{ xs: 12, mdlg: 6 }}>
            <TextField
              label="Last Name"
              value={newUser.last_name}
              onChange={(e) => setNewUser(updateFormFieldArray(newUser, e))}
            />
          </Grid>
        </Grid>
      </FormContainer>
    </div>
  );
}

export default Signup;
