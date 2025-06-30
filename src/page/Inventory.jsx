import useUpdateActiveNavigation from "../middleware/hooks/useUpdateActiveNavigation ";

import { Outlet } from "react-router-dom";

function Inventory() {
  useUpdateActiveNavigation("inventory");

  return (
    <div className="inventory-page-container">
      <Outlet />
    </div>
  );
}

export default Inventory;
