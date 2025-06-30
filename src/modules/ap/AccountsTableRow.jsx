import React from "react";
import Grid from "@mui/material/Grid";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import { UnitTextDisplay } from "../../components/display/TextDisplay";
import { IconsButton } from "../../components/input/Button";
import { formatDate, formatNumber } from "../../middleware/hooks/FormatData";

const ApAccountsTableRow = ({
  row,
  onOpenPettyCashModal,
  calculateApBalance,
}) => {
  const calculateAging = (dueDate) => {
    if (!dueDate) return 0;

    const today = new Date();
    const due = new Date(dueDate);
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    const diffTime = today.getTime() - due.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <TableRow>
      <TableCell align="center">{row.dr_number}</TableCell>

      <TableCell align="center">{formatDate(row.date)}</TableCell>

      <TableCell align="center">{formatDate(row.due_date)}</TableCell>

      <TableCell align="center">
        <UnitTextDisplay value={row.grand_total} />
      </TableCell>

      <TableCell align="center">
        <UnitTextDisplay value={formatNumber(calculateApBalance(row.id))} />
      </TableCell>

      <TableCell align="center">
        <span>{calculateAging(row.due_date)} days</span>
      </TableCell>

      <TableCell align="center">
        <Grid container justifyContent="center" spacing={1}>
          <Grid>
            <IconsButton
              size={20}
              icon="checkbook"
              color="gray"
              tooltip={`Schedule ${row.due_date} PDC's`}
              handleIconsButtonClick={() => onOpenPettyCashModal(row)}
            />
          </Grid>
          <Grid>
            <IconsButton
              size={20}
              icon="checklist"
              color="gray"
              tooltip={`View ${row.due_date} details`}
              handleIconsButtonClick={() => null}
            />
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  );
};

export default ApAccountsTableRow;
