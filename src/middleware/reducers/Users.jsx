// redux/userSlice.js

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    activeUser: [],
    usersData: [],
  },
  reducers: {
    fetchUserData: (state, action) => {
      state.activeUser = action.payload;
    },
    clearUserData: (state) => {
      state.activeUser = [];
    },
  },
});

export const { fetchUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
