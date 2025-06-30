import { useSelector } from "react-redux";
import { Grid, TableRow, TableCell, Collapse } from "@mui/material";
import { Link } from "react-router-dom";

import { IconsButton } from "../../components/input/Button";
import { UnitTextDisplay } from "../../components/display/TextDisplay";
import { useAccountPayable } from "../../middleware/hooks/useAccountPayable";
import VendorPastDue from "./VendorPastDue";

function VendorTableRow({ id, activeVendor, row, onVendorViewPastDue }) {
  const apData = useSelector((state) => state.account_payable);
  const expensesData = useSelector((state) => state.expenses);

  const { calculatePastDueBalance, calculateCurrentBalance } =
    useAccountPayable(apData, expensesData);

  const totalBalance =
    calculatePastDueBalance(row.id) + calculateCurrentBalance(row.id);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <span>{row.name}</span>
        </TableCell>

        <TableCell align="center">
          <UnitTextDisplay value={totalBalance.toLocaleString()} />
        </TableCell>

        <TableCell align="center">
          <UnitTextDisplay
            value={calculateCurrentBalance(row.id).toLocaleString()}
          />
        </TableCell>

        <TableCell align="center">
          <Grid container justifyContent="center" spacing={1}>
            <Grid item size="grow">
              <UnitTextDisplay
                value={calculatePastDueBalance(row.id).toLocaleString()}
              />
            </Grid>

            <Grid item>
              <IconsButton
                size={20}
                icon={id === activeVendor ? "hide" : "view"}
                color="gray"
                tooltip={`View ${row.name} past due`}
                handleIconsButtonClick={onVendorViewPastDue}
              />
            </Grid>
          </Grid>
        </TableCell>

        <TableCell align="center">
          <Grid container justifyContent="center" spacing={1}>
            <Grid item>
              <Link to={`/account-payable/${row.name}`} className="link">
                <IconsButton
                  size={20}
                  icon="checklist"
                  color="gray"
                  tooltip={`View ${row.name} accounts`}
                  handleIconsButtonClick={() => null}
                />
              </Link>
            </Grid>

            <Grid item>
              <IconsButton
                size={20}
                icon="edit"
                color="gray"
                tooltip={`Edit ${row.name}`}
                handleIconsButtonClick={() => null}
              />
            </Grid>

            <Grid item>
              <IconsButton
                size={20}
                icon="archive"
                color="gray"
                tooltip={`Archive ${row.name}`}
                handleIconsButtonClick={() => null}
              />
            </Grid>
          </Grid>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={5} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={id === activeVendor} timeout="auto" unmountOnExit>
            <VendorPastDue rowId={row.id} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default VendorTableRow;
