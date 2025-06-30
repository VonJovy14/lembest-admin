import "./google.scss";

import CircularProgress from "@mui/material/CircularProgress";
import Timer from "../middleware/hooks/Timer";

function ContactUs({ children, handleSuccessData, leadDetails }) {
  return (
    <div className="lead-submit-container">
      <CircularProgress />

      {children}

      <Timer second={5} setTimer={() => handleSuccessData()} />

      <div className="iframe-hide">
        <iframe
          src={
            "https://docs.google.com/forms/d/e/1FAIpQLSfLDfT82R9SoHPEq7Y4i6M_ySEJjx9W3veFr0kM423ncwUl3w/formResponse?entry.1748070804=" +
            leadDetails.first_name +
            "&entry.1217149482=" +
            leadDetails.last_name +
            "&entry.704699664=" +
            leadDetails.email +
            "&entry.773107663=" +
            leadDetails.contact_number +
            "&entry.548223276=" +
            leadDetails.message
          }
          title="Lembest"
        ></iframe>
      </div>
    </div>
  );
}

export { ContactUs };
