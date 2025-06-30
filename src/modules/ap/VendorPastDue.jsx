import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { UnitTextDisplay } from "../../components/display/TextDisplay";
import { useAccountPayable } from "../../middleware/hooks/useAccountPayable";

function VendorPastDue({ rowId }) {
  const apData = useSelector((state) => state.account_payable);
  const expensesData = useSelector((state) => state.expenses);

  const { calculateAgingOutstandingBalance } = useAccountPayable(
    apData,
    expensesData
  );

  const ranges = [
    { label: "1 - 30 days", min: 1, max: 30 },
    { label: "31 - 60 days", min: 31, max: 60 },
    { label: "61 - 90 days", min: 61, max: 90 },
    { label: "91 - 120 days", min: 91, max: 120 },
    { label: "Over 120 days", min: 121 },
  ];

  return (
    <div className="vendor-past-due-container">
      <Grid container justifyContent="space-evenly">
        {ranges.map(({ label, min, max }) => (
          <Grid item key={label} xs={2}>
            <div>
              <b>{label}</b>
            </div>
            <UnitTextDisplay
              value={calculateAgingOutstandingBalance({
                vendorId: rowId,
                minDays: min,
                maxDays: max,
              }).toLocaleString()}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default VendorPastDue;
