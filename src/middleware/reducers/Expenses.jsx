import { createSlice } from "@reduxjs/toolkit";

export const expensesSlice = createSlice({
  name: "expenses",
  initialState: [],
  reducers: {
    fetchExpensesData: (state, action) => {
      return action.payload;
    },
    addExpensesData: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { fetchExpensesData, addExpensesData } = expensesSlice.actions;

export default expensesSlice.reducer;
