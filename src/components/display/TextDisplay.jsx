import "./textDisplay.scss";

import Grid from "@mui/material/Grid";

const UnitTextDisplay = ({ unit, value }) => {
  return (
    <div className="unit-text-display-container">
      <Grid
        container
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Grid>{unit ? unit : "₱"}</Grid>
        <Grid>{value}</Grid>
      </Grid>
    </div>
  );
};

export { UnitTextDisplay };
