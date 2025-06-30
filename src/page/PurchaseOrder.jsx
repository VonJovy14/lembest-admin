import useUpdateActiveNavigation from "../middleware/hooks/useUpdateActiveNavigation ";

import VendorPO from "../modules/forms/VendorPO";

function PurchaseOrder() {
  useUpdateActiveNavigation("purchase-order");

  return (
    <div>
      <VendorPO />
    </div>
  );
}

export default PurchaseOrder;
