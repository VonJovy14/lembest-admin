import { useSelector } from "react-redux";

import { formatDate, formatNumber } from "../../middleware/hooks/FormatData";

import PettyCash from "../forms/PettyCash";

import AccountPDC from "../PDC";

import AppModalWithClose from "../../components/display/Modal";
import { BorderContainer } from "../Container";
import { UnitTextDisplay } from "../../components/display/TextDisplay";

import Grid from "@mui/material/Grid";

const ApPettyCashModal = ({ open, close, data, calculateApBalance }) => {
  const apExpenses = useSelector((state) => state.expenses);

  if (!data?.id) return null;

  const calculateAging = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    const diffTime = today - due;
    return Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
  };

  const fetchAccountPDC = apExpenses.filter((item) => item.ap_id === data.id);

  return (
    <AppModalWithClose
      title={`DR Number - ${data.dr_number}`}
      modalState={open}
      closeModal={close}
      size="1000"
    >
      <div className="ap-accounts-petty-cash-modal-container">
        <div className="ap-accounts-petty-cash-modal-wrapper">
          <Grid container spacing={2}>
            <Grid size={4}>
              <BorderContainer border="orange">
                <div className="ap-accounts-petty-cash-details-container">
                  <div>
                    <b>DUE DATE</b>
                  </div>
                  <span>{formatDate(data.due_date)}</span>
                </div>
              </BorderContainer>
            </Grid>

            <Grid size={4}>
              <BorderContainer border="orange">
                <div className="ap-accounts-petty-cash-details-container">
                  <div>
                    <b>BALANCE</b>
                  </div>
                  <UnitTextDisplay
                    value={formatNumber(calculateApBalance(data.id))}
                  />
                </div>
              </BorderContainer>
            </Grid>

            <Grid size={4}>
              <BorderContainer border="orange">
                <div className="ap-accounts-petty-cash-details-container">
                  <div>
                    <b>AGING</b>
                  </div>
                  <span>{calculateAging(data.due_date)} days</span>
                </div>
              </BorderContainer>
            </Grid>
          </Grid>
        </div>

        <div className="ap-accounts-petty-cash-modal-wrapper">
          <AccountPDC data={fetchAccountPDC} />
        </div>

        <PettyCash
          id={data.id}
          balance={calculateApBalance(data.id)}
          dueDate={data.due_date}
        />
      </div>
    </AppModalWithClose>
  );
};

export default ApPettyCashModal;
