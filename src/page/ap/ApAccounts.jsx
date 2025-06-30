import "./apaccounts.scss";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Grid from "@mui/material/Grid";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { TitleOne } from "../../components/display/Title";
import { IconsButton, CircleIconsButton } from "../../components/input/Button";

import ApPettyCashModal from "../../modules/ap/ApPettyCashModal";
import ApAccountsTableRow from "../../modules/ap/AccountsTableRow";
import { useAccountPayable } from "../../middleware/hooks/useAccountPayable";

import AppModalWithClose from "../../components/display/Modal";
import AccountsAdd from "../../modules/forms/AccountsAdd";

function ApAccounts() {
  const { vendorName } = useParams();
  const decodedVendorName = decodeURIComponent(vendorName);

  const vendorData = useSelector((state) => state.vendor.vendorData);
  const apData = useSelector((state) => state.account_payable);
  const expensesData = useSelector((state) => state.expenses);

  const [filteredApData, setFilteredApData] = useState([]);
  const [activeApAccountData, setActiveApAccountData] = useState({});
  const [pettyCashModalState, setPettyCashModalState] = useState(false);
  const [addAccountModalState, setAddAccountModalState] = useState(false);

  const { calculateApBalance } = useAccountPayable(apData, expensesData);

  useEffect(() => {
    if (apData && vendorData && decodedVendorName) {
      const matchedVendor = vendorData.find(
        (vendor) => vendor.name === decodedVendorName
      );

      if (matchedVendor) {
        const filtered = apData.filter(
          (item) => item.vendor_id === matchedVendor.id
        );

        const sorted = [...filtered].sort(
          (a, b) => new Date(a.due_date) - new Date(b.due_date)
        );

        setFilteredApData(sorted);
      } else {
        setFilteredApData([]);
      }
    }
  }, [apData, vendorData, decodedVendorName]);

  const handleOpenPettyCashModal = (data) => {
    setActiveApAccountData(data);
    setPettyCashModalState(true);
  };

  const AddAccountModal = ({ open, close }) => (
    <AppModalWithClose
      title="Add New Account"
      modalState={open}
      closeModal={close}
    >
      <div className="ap-accounts-add-account-modal-container">
        <AccountsAdd />
      </div>
    </AppModalWithClose>
  );

  return (
    <>
      <div className="ap-accounts-page-container">
        <Grid container alignItems="center" spacing={1}>
          <Grid>
            <Link to="/account-payable" className="link">
              <IconsButton
                size={20}
                icon="back"
                color="gray"
                tooltip="Back to accounts"
                handleIconsButtonClick={() => null}
              />
            </Link>
          </Grid>

          <Grid>
            <TitleOne>
              <h4>{vendorName.toUpperCase()}</h4>
            </TitleOne>
          </Grid>

          <Grid size="grow">
            <IconsButton
              size={20}
              icon="edit"
              color="gray"
              tooltip={`Edit ${vendorName} details`}
              handleIconsButtonClick={() => null}
            />
          </Grid>

          <Grid>
            <CircleIconsButton
              size={30}
              icon="wallet"
              tooltip="Add accounts"
              handleCircleIconsButtonClick={() => setAddAccountModalState(true)}
            />
          </Grid>

          <Grid>
            <CircleIconsButton
              size={30}
              icon="list"
              tooltip="View full vendor accounts"
              handleCircleIconsButtonClick={() => null}
            />
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <b>DR NUMBER</b>
                </TableCell>
                <TableCell align="center">
                  <b>DELIVERY DATE</b>
                </TableCell>
                <TableCell align="center">
                  <b>DUE DATE</b>
                </TableCell>
                <TableCell align="center">
                  <b>AMOUNT</b>
                </TableCell>
                <TableCell align="center">
                  <b>BALANCE</b>
                </TableCell>
                <TableCell align="center">
                  <b>AGING</b>
                </TableCell>
                <TableCell align="center">
                  <b>ACTIONS</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredApData.map((row, index) => (
                <ApAccountsTableRow
                  key={index}
                  row={row}
                  calculateApBalance={calculateApBalance}
                  onOpenPettyCashModal={handleOpenPettyCashModal}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <ApPettyCashModal
        open={pettyCashModalState}
        close={() => setPettyCashModalState(false)}
        data={activeApAccountData}
        calculateApBalance={calculateApBalance}
      />

      <AddAccountModal
        open={addAccountModalState}
        close={() => setAddAccountModalState(false)}
      />
    </>
  );
}

export default ApAccounts;
