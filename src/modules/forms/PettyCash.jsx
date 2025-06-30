import "./pettycash.scss";

import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { formatSelectData } from "../../middleware/hooks/FormatData";
import { TextField, NumberField } from "../../components/input/TextField";
import { TextButton, IconsButton } from "../../components/input/Button";
import Select from "../../components/input/Select";
import { FormContainer, BorderContainer } from "../Container";
import { usePettyCash } from "../../middleware/hooks/usePettyCash"; // ⬅️ Your custom hook!

function PettyCash({ id, balance, dueDate }) {
  const {
    pettyCash,
    handleNewPettyCashItem,
    handleCheckChange,
    handleDeleteCheckItem,
    handlePettyCashSubmit,
    handleBankSelection,
    calculatePettyCashTotal,
    splitBalance,
  } = usePettyCash({ id, balance, dueDate });

  const _renderMOPNumber = (mop) =>
    ({
      check: "Check Number",
      cash: "Cash Payment",
    })[mop] || "Reference Number";

  const _renderPettyCashItem = () => (
    <div className="petty-cash-module-check-payment-items-container">
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "25%" }} />
              <TableCell align="center" sx={{ width: "25%" }}>
                <b>BANK</b>
              </TableCell>
              <TableCell align="center" sx={{ width: "15%" }}>
                <b>DATE</b>
              </TableCell>
              <TableCell align="center" sx={{ width: "25%" }}>
                <b>AMOUNT</b>
              </TableCell>
              <TableCell align="center" sx={{ width: "15%" }}>
                <b>ACTION</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(pettyCash).map(([key, row]) => (
              <TableRow key={key}>
                <TableCell>
                  <TextField
                    type="text"
                    disabled={row.mode_of_payment === "cash"}
                    label={_renderMOPNumber(row.mode_of_payment)}
                    value={row.reference_number}
                    onChange={(e) =>
                      handleCheckChange(key, "reference_number", e.target.value)
                    }
                  />
                </TableCell>

                <TableCell>
                  <Select
                    label=""
                    data={formatSelectData(
                      handleBankSelection(row.mode_of_payment)
                    )}
                    value={row.account}
                    disabled={row.mode_of_payment === "cash"}
                    onSelectChange={(e) =>
                      handleCheckChange(key, "account", e.target.value)
                    }
                  />
                </TableCell>

                {console.log(row.date)}

                <TableCell>
                  <TextField
                    type="date"
                    label=""
                    value={row.date}
                    onChange={(e) =>
                      handleCheckChange(key, "date", e.target.value)
                    }
                  />
                </TableCell>

                <TableCell align="center">
                  <NumberField
                    type="text"
                    label=""
                    value={row.amount}
                    onChange={(e) =>
                      handleCheckChange(key, "amount", e.target.value)
                    }
                    onBlur={(e) =>
                      handleCheckChange(key, "amount", e.target.value)
                    }
                  />
                </TableCell>

                <TableCell align="center">
                  <IconsButton
                    size={25}
                    icon="delete"
                    color="red"
                    tooltip="Delete this item"
                    handleIconsButtonClick={() => handleDeleteCheckItem(key)}
                  />
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell colSpan={3} align="right">
                <Grid
                  container
                  justifyContent="flex-end"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>
                    <b>TOTAL</b>
                  </Grid>
                  <Grid item>
                    <IconsButton
                      size={15}
                      icon="info"
                      tooltip="This total reflects only the current petty cash items."
                      handleIconsButtonClick={() => null}
                    />
                  </Grid>
                </Grid>
              </TableCell>

              <TableCell>
                <NumberField
                  type="text"
                  label=""
                  disabled
                  value={calculatePettyCashTotal()}
                  onChange={() => null}
                />
              </TableCell>

              <TableCell align="center">
                {Object.keys(pettyCash).length > 1 && (
                  <IconsButton
                    size={25}
                    icon="split"
                    color="gray"
                    tooltip="Split balance"
                    handleIconsButtonClick={splitBalance}
                  />
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );

  return (
    <div className="petty-cash-module-container">
      <FormContainer
        button="save petty cash"
        onFormSubmit={handlePettyCashSubmit}
      >
        <BorderContainer border="orange">
          {Object.keys(pettyCash).length > 0 && _renderPettyCashItem()}

          <div>
            <Grid container justifyContent="space-around">
              <Grid>
                <TextButton
                  text="ADD CASH"
                  handleTextButton={() => handleNewPettyCashItem("cash")}
                />
              </Grid>
              <Grid>
                <TextButton
                  text="ADD CHECK"
                  handleTextButton={() => handleNewPettyCashItem("check")}
                />
              </Grid>
              <Grid>
                <TextButton
                  text="BANK TRANSFER"
                  handleTextButton={() => handleNewPettyCashItem("bank")}
                />
              </Grid>
            </Grid>
          </div>
        </BorderContainer>
      </FormContainer>
    </div>
  );
}

export default PettyCash;
