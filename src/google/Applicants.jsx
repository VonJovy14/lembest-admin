import "./google.scss";

import CircularProgress from "@mui/material/CircularProgress";
import Timer from "../middleware/hooks/Timer";

function ApplicantSubmit({ children, handleSuccessData, applicantDetails }) {
  return (
    <div className="lead-submit-container">
      <CircularProgress />

      {children}

      <Timer second={5} setTimer={() => handleSuccessData()} />

      <div className="iframe-hide">
        <iframe
          src={
            "https://docs.google.com/forms/d/e/1FAIpQLSedZ7HtezE17NafDzWo6ejIDcc8ybBLpWbmmlzMullL3HEulg/formResponse?entry.337357676=" +
            applicantDetails.first_name +
            "&entry.1364454551=" +
            applicantDetails.middle_name +
            "&entry.1526453364=" +
            applicantDetails.last_name +
            "&entry.484493537=" +
            applicantDetails.barangay +
            "&entry.1162764290=" +
            applicantDetails.municipality +
            "&entry.1315690465=" +
            applicantDetails.province +
            "&entry.2096643788=" +
            applicantDetails.contact_number +
            "&entry.1728678000=" +
            applicantDetails.email +
            "&entry.1031666347=" +
            applicantDetails.desired_position +
            "&entry.779316372=" +
            applicantDetails.file_link
          }
          title="Lembest"
        ></iframe>
      </div>
    </div>
  );
}

export { ApplicantSubmit };
