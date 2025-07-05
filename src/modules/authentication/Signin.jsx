import { useState } from "react";
import { useDispatch } from "react-redux";

import { updateFormFieldArray } from "../../helper/useDataChange";

import { loginUserAction } from "../../middleware/action/Users";

import { TextField } from "../../components/input/TextField";
import { FormContainer } from "../../components/display/Container";

function Signin() {
  const dispatch = useDispatch();
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const onSignInSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await dispatch(loginUserAction(userCredentials));
  };

  return (
    <div className="signin-modules-container">
      <FormContainer button="signin" onFormSubmit={onSignInSubmit}>
        <TextField
          label="Email"
          type="email"
          value={userCredentials.email}
          onChange={(e) =>
            setUserCredentials(updateFormFieldArray(userCredentials, e))
          }
        />

        <TextField
          label="Password"
          type="password"
          value={userCredentials.password}
          onChange={(e) =>
            setUserCredentials(updateFormFieldArray(userCredentials, e))
          }
        />
      </FormContainer>
    </div>
  );
}

export default Signin;
