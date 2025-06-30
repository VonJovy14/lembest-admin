import useUpdateActiveNavigation from "../middleware/hooks/useUpdateActiveNavigation ";

import { Outlet } from "react-router-dom";

function AccountPayable() {
  useUpdateActiveNavigation("account-payable");

  return (
    <div className="account-payable-page-container">
      <Outlet />
    </div>
  );
}

export default AccountPayable;
