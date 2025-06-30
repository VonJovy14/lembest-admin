import { createSlice } from "@reduxjs/toolkit";

export const accountsSlice = createSlice({
  name: "accounts",
  initialState: [],
  reducers: {
    fetchAccountsData: (state, action) => {
      return action.payload;
    },
    addAccountsData: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { fetchAccountsData, addAccountsData } = accountsSlice.actions;

export default accountsSlice.reducer;
