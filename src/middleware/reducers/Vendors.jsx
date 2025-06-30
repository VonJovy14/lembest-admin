import { createSlice } from "@reduxjs/toolkit";

export const vendorSlice = createSlice({
  name: "vendors",
  initialState: {
    vendorData: [],
    purchaseOrder: [],
  },
  reducers: {
    fetchVendorData: (state, action) => {
      state.vendorData = action.payload;
    },
    addVendorData: (state, action) => {
      state.vendorData.push(action.payload);
    },
    addPurchaseOrderData: (state, action) => {
      state.purchaseOrder.push(action.payload);
    },
    fetchPurchaseOrder: (state, action) => {
      state.purchaseOrder = action.payload;
    },
  },
});

export const {
  fetchVendorData,
  addVendorData,
  addPurchaseOrderData,
  fetchPurchaseOrder,
} = vendorSlice.actions;

export default vendorSlice.reducer;
