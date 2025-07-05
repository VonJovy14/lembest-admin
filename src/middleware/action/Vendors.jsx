import { fetchVendorData, fetchPurchaseOrder } from "../reducers/Vendors";

export const fetchVendorDataAction = (vendorData) => (dispatch) => {
  dispatch(fetchVendorData(vendorData));
};

export const fetchPurchaseOrderAction = (purchaseOrderData) => (dispatch) => {
  dispatch(fetchPurchaseOrder(purchaseOrderData));
};
