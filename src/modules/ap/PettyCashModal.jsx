import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import AppModalWithClose from "../../components/display/Modal";
import { BorderContainer } from "../../modules/Container";
import { UnitTextDisplay } from "../../components/display/TextDisplay";
import PettyCash from "../../modules/forms/PettyCash";
import {
  formatDate,
  formatNumber,
  formatNumberBack,
} from "../../middleware/hooks/FormatData";

const PettyCashModal = ({ open, close, data, calculateApBalance }) => {
  if (!data?.id) return null;

  const balance =
    formatNumberBack(data.grand_total) - calculateApBalance(data.id);

  const calculateAging = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    const diffTime = today - due;
    return Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
  };

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
                  <UnitTextDisplay value={formatNumber(balance)} />
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

        <PettyCash id={data.id} balance={balance} dueDate={data.due_date} />
      </div>
    </AppModalWithClose>
  );
};

export default PettyCashModal;
