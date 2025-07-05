import { createSlice } from "@reduxjs/toolkit";

export const vendorSlice = createSlice({
  name: "account_payable",
  initialState: [],
  reducers: {
    fetchAccountPayableData: (state, action) => {
      return action.payload;
    },
    addNewAccountPayable: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { fetchAccountPayableData, addNewAccountPayable } =
  vendorSlice.actions;

export default vendorSlice.reducer;
