import { useDispatch, useSelector } from "react-redux";

import { updateDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase";

import { updateExpensesDataAction } from "../middleware/action/Expenses";

import { formatNumber } from "../middleware/hooks/FormatData";

import { UnitTextDisplay } from "../components/display/TextDisplay";
import { IconsButton } from "../components/input/Button";
import { confirmDialog, autoCloseAlert } from "../components/display/Alert";

import Swal from "sweetalert2";
import { Grid } from "@mui/material";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function PDC({ data }) {
  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.accounts);

  const formatAccount = (accountId) => {
    const account = accounts.find((acc) => acc.id === accountId);
    return account ? account.name : "Unknown Account";
  };

  const handlePDCStatus = async (status, expensesData) => {
    const result = await confirmDialog({
      text:
        "You're updating check #" + expensesData.reference_number + " status.",
      confirmButtonText: "Yes, update it",
      footer: "You cannot revert this changes.",
    });

    if (result.isConfirmed) {
      const docRef = doc(db, "expenses", expensesData.id);
      try {
        const { id, ...cleanedData } = expensesData;

        await updateDoc(docRef, {
          ...cleanedData,
          status: status,
        });

        dispatch(updateExpensesDataAction({ ...expensesData, status: status }));

        await autoCloseAlert({
          text: "Check #" + expensesData.reference_number + " updated status.",
        });
      } catch (err) {
        console.error("🔥 Firestore error:", err);
        Swal.fire("Error!", "Something went wrong saving your data.", "error");
      }
    } else {
      Swal.fire("Cancelled", "Changes were not saved", "info");
    }
  };

  return (
    <div className="pdc-module-container">
      <span>{data.id}</span>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ width: "28%" }}>
                <b>CHECK NUMBER</b>
              </TableCell>

              <TableCell align="center" sx={{ width: "15%" }}>
                <b>BANK</b>
              </TableCell>

              <TableCell align="center" sx={{ width: "15%" }}>
                <b>DATE</b>
              </TableCell>

              <TableCell align="center" sx={{ width: "15%" }}>
                <b>AMOUNT</b>
              </TableCell>

              <TableCell align="center" sx={{ width: "15%" }}>
                <b>STATUS</b>
              </TableCell>

              <TableCell align="center">
                <b>ACTION</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center">{row.reference_number}</TableCell>

                <TableCell align="center">
                  {formatAccount(row.account)}
                </TableCell>

                <TableCell align="center">{row.date}</TableCell>

                <TableCell align="center">
                  <UnitTextDisplay value={formatNumber(row.amount)} />
                </TableCell>

                <TableCell align="center">{row.status}</TableCell>

                <TableCell align="center">
                  {row.status === "CLEARED" ||
                  row.status === "BOUNCED" ||
                  row.status === "CANCELED" ? (
                    <span>-</span>
                  ) : (
                    <Grid container spacing={1} justifyContent="center">
                      <Grid>
                        <IconsButton
                          size={20}
                          icon="check"
                          color="green"
                          tooltip={`Clear check #${row.reference_number}`}
                          handleIconsButtonClick={() =>
                            handlePDCStatus("CLEARED", row)
                          }
                        />
                      </Grid>

                      <Grid>
                        <IconsButton
                          size={20}
                          icon="cancel"
                          color="red"
                          tooltip={`Cancel check #${row.reference_number}`}
                          handleIconsButtonClick={() =>
                            handlePDCStatus("CANCEL", row)
                          }
                        />
                      </Grid>
                    </Grid>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default PDC;
