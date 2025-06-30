import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { fetchData } from "../../middleware/hooks/readData";
import { fetchUserData } from "../../middleware/reducers/Users";

import { TextField } from "../../components/input/TextField";
import { FormContainer } from "../../modules/Container";

import Swal from "sweetalert2";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userCredentials.email,
        userCredentials.password
      );

      const activeUserData = await fetchData("users", userCredential.user.uid);

      await dispatch(fetchUserData(activeUserData));

      await e.target.reset();
      await navigate("/");
    } catch (error) {
      console.error("🔥 Login error:", error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "It's possible you don't have an account yet.",
        footer: "Call your systems administrator to create an account.",
        showConfirmButton: false,
      });
    }
  };

  return (
    <FormContainer button="SIGN IN" onFormSubmit={handleSignIn}>
      <TextField
        type="email"
        label="Email"
        value={userCredentials.email}
        onChange={(e) =>
          setUserCredentials({ ...userCredentials, email: e.target.value })
        }
      />
      <TextField
        type="password"
        label="Password"
        value={userCredentials.password}
        onChange={(e) =>
          setUserCredentials({ ...userCredentials, password: e.target.value })
        }
      />
    </FormContainer>
  );
}

export default SignIn;
