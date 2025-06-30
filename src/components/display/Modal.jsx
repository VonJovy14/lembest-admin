import "./modal.scss";

import { CircleIconsButton } from "../input/Button";

import Grid from "@mui/material/Grid";

export default function AppModalWithClose({
  title,
  modalState,
  closeModal,
  children,
  size,
}) {
  return (
    <div
      open={modalState}
      className={
        "modal-container modal-position " +
        (modalState ? "modal-visibility-show" : "modal-visibility-hide")
      }
    >
      <div
        className="modal-wrapper modal-position"
        style={{ maxWidth: size ? size + "px" : "500px" }}
      >
        <div className="modal-details-outside-container">
          <div className="modal-details-inside-container">
            <Grid
              container
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Grid>
                <b>{title.toUpperCase()}</b>
              </Grid>

              <Grid>
                <CircleIconsButton
                  size={20}
                  icon="close"
                  tooltip="Close"
                  handleCircleIconsButtonClick={() => closeModal()}
                />
              </Grid>
            </Grid>

            {modalState ? children : null}
          </div>
        </div>
      </div>
    </div>
  );
}
