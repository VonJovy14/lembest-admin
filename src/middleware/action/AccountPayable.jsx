import {
  fetchAccountPayableData,
  addNewAccountPayable,
} from "../reducers/AccountPayable";

export const fetchAccountPayableDataAction = (deliveriesData) => (dispatch) => {
  dispatch(fetchAccountPayableData(deliveriesData));
};

export const addNewAccountPayableAction = (deliveryData) => (dispatch) => {
  dispatch(addNewAccountPayable(deliveryData));
};
