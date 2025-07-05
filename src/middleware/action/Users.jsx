import axios from "axios";
import { fetchUserData, clearUserData } from "../reducers/Users";

import Swal from "sweetalert2";

export const registerUserAction = (userData) => async () => {
  try {
    await axios.post("http://localhost:3001/api/users/register", userData);

    return { success: true };
  } catch (error) {
    console.error("Registration failed", error);
    await Swal.fire(
      "Error!",
      "Something went wrong registering your account.",
      "error"
    );
  }
};

export const loginUserAction = (credentials) => async (dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:3001/api/users/login",
      credentials
    );
    localStorage.setItem("token", res.data.token);
    dispatch(fetchUserData(res.data.user));
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
  }
};

export const fetchCurrentUser = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const res = await axios.get("http://localhost:3001/api/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(fetchUserData(res.data));
  } catch (error) {
    console.error(
      "Fetching current user failed:",
      error.response?.data || error.message
    );
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(clearUserData());
};
