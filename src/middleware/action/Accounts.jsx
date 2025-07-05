import { fetchAccountsData } from "../reducers/Accounts";

export const fetchAccountsDataAction = (accountsData) => (dispatch) => {
  dispatch(fetchAccountsData(accountsData));
};
