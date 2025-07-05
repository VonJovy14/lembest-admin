import { configureStore } from "@reduxjs/toolkit";

import navigationReducer from "../middleware/reducers/Navigation";
import vendorReducer from "../middleware/reducers/Vendors";
import apReducer from "../middleware/reducers/AccountPayable";
import accountsReducer from "../middleware/reducers/Accounts";
import expensesReducer from "../middleware/reducers/Expenses";
import usersReducer from "../middleware/reducers/Users";
import inventoryReducer from "../middleware/reducers/Inventory";

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    vendor: vendorReducer,
    account_payable: apReducer,
    accounts: accountsReducer,
    expenses: expensesReducer,
    users: usersReducer,
    inventory: inventoryReducer,
  },
});
