import { TextField, NumberField } from "../../components/input/TextField";
import { TextButton, IconsButton } from "../../components/input/Button";
import { FormContainer } from "../Container";
import {
  formatNumber,
  handleNumber,
  handleBlur,
  formatSelectData,
} from "../../middleware/hooks/FormatData";
import Select from "../../components/input/Select";
import { usePurchaseOrder } from "../../middleware/hooks/usePurchaseOrder";

import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function VendorPO() {
  const {
    poData,
    setPoData,
    poItems,
    charges,
    handleNewItem,
    handleItemChange,
    handleChargesChange,
    handleDeletePoItem,
    calculatePoTotal,
    handlePoSubmit,
    vendorData,
  } = usePurchaseOrder();

  return (
    <div className="vendor-po-page-container">
      <FormContainer button="submit" onFormSubmit={handlePoSubmit}>
        <Grid container spacing={2}>
          <Grid>
            <TextField
              type="text"
              label="DR Number"
              value={poData.drNumber}
              onChange={(e) =>
                setPoData({ ...poData, drNumber: e.target.value })
              }
            />
          </Grid>

          <Grid size="grow">
            <Select
              label="SUPPLIER"
              data={formatSelectData(vendorData)}
              value={poData.vendorId}
              onSelectChange={(e) =>
                setPoData({ ...poData, vendorId: e.target.value })
              }
            />
          </Grid>

          <Grid>
            <TextField
              type="date"
              label="Date"
              value={poData.date}
              onChange={(e) => setPoData({ ...poData, date: e.target.value })}
            />
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ width: "45%" }}>
                  <b>PARTICULARS</b>
                </TableCell>
                <TableCell align="center" sx={{ width: "15%" }}>
                  <b>QUANTITY</b>
                </TableCell>
                <TableCell align="center" sx={{ width: "20%" }}>
                  <b>UNIT PRICE</b>
                </TableCell>
                <TableCell align="center" sx={{ width: "20%" }}>
                  <b>PRICE</b>
                </TableCell>
                <TableCell align="center">
                  <b>ACTIONS</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {Object.keys(poItems).length > 0 &&
                Object.entries(poItems).map(([key, row]) => (
                  <TableRow key={key}>
                    <TableCell>
                      <TextField
                        type="text"
                        label=""
                        value={row.particulars}
                        onChange={(e) =>
                          handleItemChange(key, "particulars", e.target.value)
                        }
                      />
                    </TableCell>

                    <TableCell align="center">
                      <NumberField
                        type="text"
                        label=""
                        unit=" "
                        value={row.quantity}
                        onChange={(e) =>
                          handleItemChange(key, "quantity", handleNumber(e))
                        }
                        onBlur={(e) =>
                          handleItemChange(key, "quantity", handleBlur(e))
                        }
                      />
                    </TableCell>

                    <TableCell align="center">
                      <NumberField
                        type="text"
                        label=""
                        value={row.unit_price}
                        onChange={(e) =>
                          handleItemChange(key, "unit_price", handleNumber(e))
                        }
                        onBlur={(e) =>
                          handleItemChange(key, "unit_price", handleBlur(e))
                        }
                      />
                    </TableCell>

                    <TableCell align="center">
                      <NumberField
                        type="text"
                        disabled
                        label=""
                        value={formatNumber(
                          parseFloat(row.quantity || 0) *
                            parseFloat(row.unit_price || 0)
                        )}
                        onChange={() => null}
                      />
                    </TableCell>

                    <TableCell align="center">
                      <IconsButton
                        size={25}
                        icon="delete"
                        color="red"
                        tooltip="Delete this item"
                        handleIconsButtonClick={() => handleDeletePoItem(key)}
                      />
                    </TableCell>
                  </TableRow>
                ))}

              <TableRow>
                <TableCell align="center" colSpan={2}>
                  <TextButton
                    text="Add new po item"
                    handleTextButton={handleNewItem}
                  />
                </TableCell>
                <TableCell align="right">
                  <b>TOTAL</b>
                </TableCell>
                <TableCell align="center">
                  <NumberField
                    type="text"
                    disabled
                    label=""
                    value={formatNumber(calculatePoTotal())}
                    onChange={() => null}
                  />
                </TableCell>
                <TableCell />
              </TableRow>

              <TableRow>
                <TableCell align="right" colSpan={2}>
                  <b>CHARGES</b>
                </TableCell>

                <TableCell align="center">
                  <NumberField
                    type="text"
                    label="Discount"
                    value={charges.discount}
                    onChange={(e) =>
                      handleChargesChange("discount", handleNumber(e))
                    }
                    onBlur={(e) =>
                      handleChargesChange("discount", handleBlur(e))
                    }
                  />
                </TableCell>

                <TableCell align="center">
                  <NumberField
                    type="text"
                    label="Withholding Tax"
                    value={charges.wTax}
                    onChange={(e) =>
                      handleChargesChange("wTax", handleNumber(e))
                    }
                    onBlur={(e) => handleChargesChange("wTax", handleBlur(e))}
                  />
                </TableCell>
                <TableCell />
              </TableRow>

              <TableRow>
                <TableCell align="right" colSpan={3}>
                  <b>GRAND TOTAL</b>
                </TableCell>
                <TableCell align="center">
                  <NumberField
                    type="text"
                    disabled
                    label=""
                    value={formatNumber(
                      calculatePoTotal() -
                        parseFloat(charges.discount || 0) +
                        parseFloat(charges.wTax || 0)
                    )}
                    onChange={() => null}
                  />
                </TableCell>
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </FormContainer>
    </div>
  );
}

export default VendorPO;
