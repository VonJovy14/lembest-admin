// 📁 src/utils/routes.jsx
import { Routes, Route } from "react-router-dom";

import App from "./App";
import { AppContainer, AppWrapper } from "../modules/Container";

import RequireAuth from "../middleware/context/RequireAuth";

import Home from "../page/Home";
import Login from "../page/Login";
import NotFound from "../page/NotFound";

import PurchaseOrder from "../page/PurchaseOrder";
import AccountPayable from "../page/AccountPayable";
import ApDashboard from "../page/ap/ApDashboard";
import ApAccounts from "../page/ap/ApAccounts";
import Users from "../page/Users";
import SignUp from "../page/authentication/SignUp";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<App />}>
        <Route element={<AppContainer />}>
          {/* Public Landing Page */}
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            element={
              <RequireAuth>
                <AppWrapper />
              </RequireAuth>
            }
          >
            <Route path="register-account" element={<SignUp />} />
            <Route path="purchase-order" element={<PurchaseOrder />} />
            <Route path="account-payable" element={<AccountPayable />}>
              <Route index element={<ApDashboard />} />
              <Route path=":vendorName" element={<ApAccounts />} />
            </Route>
            <Route path="users" element={<Users />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
