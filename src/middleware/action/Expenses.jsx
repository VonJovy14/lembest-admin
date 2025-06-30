import { fetchExpensesData } from "../reducers/Expenses";

export const fetchExpensesDataAction = (pettyCashData) => (dispatch) => {
  dispatch(fetchExpensesData(pettyCashData));
};
