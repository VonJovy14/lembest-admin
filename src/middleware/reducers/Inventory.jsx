import { createSlice } from "@reduxjs/toolkit";

export const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    items: [],
    activeItems: [],
  },
  reducers: {
    readInventoryData: (state, action) => {
      state.items = action.payload;
    },
    createNewInventoryItem: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { readInventoryData, createNewInventoryItem } =
  inventorySlice.actions;

export default inventorySlice.reducer;
