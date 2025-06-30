import "./apdashboard.scss";
import React, { useState } from "react";
import { useSelector } from "react-redux";
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

import { CircleIconsButton } from "../../components/input/Button";
import AppModalWithClose from "../../components/display/Modal";
import VendorAdd from "../../modules/forms/VendorAdd";
import VendorPO from "../../modules/forms/VendorPO";
import VendorTableRow from "../../modules/ap/VendorTableRow";

function ApDashboard() {
  const vendorData = useSelector((state) => state.vendor.vendorData);
  const [addVendorModalState, setAddVendorModalState] = useState(false);
  const [addPoModalState, setAddPoModalState] = useState(false);
  const [activeVendor, setActiveVendor] = useState(null);

  const handleViewVendorPastDue = (key) => {
    setActiveVendor((prev) => (prev === key ? null : key));
  };

  return (
    <>
      <div className="ap-dashboard-page-container">
        <div className="ap-dashboard-page-header-container">
          <Grid container justifyContent="flex-end" spacing={1}>
            <Grid>
              <CircleIconsButton
                size={30}
                icon="po"
                tooltip="Add new purchase order"
                handleCircleIconsButtonClick={() => setAddPoModalState(true)}
              />
            </Grid>
            <Grid>
              <CircleIconsButton
                size={30}
                icon="add"
                tooltip="Add new vendor"
                handleCircleIconsButtonClick={() =>
                  setAddVendorModalState(true)
                }
              />
            </Grid>
          </Grid>
        </div>

        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ width: "15%" }}>
                  <b>SUPPLIER NAME</b>
                </TableCell>
                <TableCell align="center" sx={{ width: "25%" }}>
                  <b> OUTSTANDING BALANCE</b>
                </TableCell>
                <TableCell align="center" sx={{ width: "20%" }}>
                  <b>CURRENT</b>
                </TableCell>
                <TableCell align="center" sx={{ width: "20%" }}>
                  <b>PAST DUE</b>
                </TableCell>
                <TableCell align="center" sx={{ width: "15%" }}>
                  <b>ACTIONS</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {Object.entries(vendorData).map(([key, row]) => (
                <VendorTableRow
                  key={key}
                  id={key}
                  activeVendor={activeVendor}
                  row={row}
                  onVendorViewPastDue={() => handleViewVendorPastDue(key)}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <AppModalWithClose
        title="Add new vendor"
        modalState={addVendorModalState}
        closeModal={() => setAddVendorModalState(false)}
      >
        <VendorAdd />
      </AppModalWithClose>

      <AppModalWithClose
        title="Add new purchase order"
        modalState={addPoModalState}
        size="1000"
        closeModal={() => setAddPoModalState(false)}
      >
        <VendorPO />
      </AppModalWithClose>
    </>
  );
}

export default ApDashboard;
