import "./google.scss";

import CircularProgress from "@mui/material/CircularProgress";
import Timer from "../middleware/hooks/Timer";

function LeadSubmit({ children, handleSuccessData, leadDetails, leads_from }) {
  return (
    <div className="lead-submit-container">
      <CircularProgress />

      {children}

      <Timer second={5} setTimer={() => handleSuccessData()} />

      <div className="iframe-hide">
        <iframe
          src={
            "https://docs.google.com/forms/d/e/1FAIpQLSf-vqPvRf08ceMdtbMJxgy1giqoisLmNRvDJuVLqUX_1enxew/formResponse?entry.1981904347=" +
            leadDetails.first_name +
            "&entry.2098978819=" +
            leadDetails.last_name +
            "&entry.945758461=" +
            leadDetails.email +
            "&entry.936937963=" +
            leadDetails.contact_number +
            "&entry.218029288=" +
            leadDetails.target_location +
            "&entry.897939814=" +
            leads_from
          }
          title="Lembest"
        ></iframe>
      </div>
    </div>
  );
}

export { LeadSubmit };
