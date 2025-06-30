import "./loading.scss";

import { ModuleContainer } from "../modules/Container";

import LinearProgress from "@mui/material/LinearProgress";

function Loading() {
  return (
    <div className="loading-page-container">
      <div className="loading-page-wrapper">
        <ModuleContainer color="orange">
          <LinearProgress color="inherit" />
          <span>Just a sec! We're working our magic behind the scenes.</span>
        </ModuleContainer>
      </div>
    </div>
  );
}

export default Loading;
