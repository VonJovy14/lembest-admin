import "./App.scss";
import "./colors.scss";
import "./fonts.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { Outlet } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { useReadData } from "../middleware/hooks/readData";

// Define the custom theme with modified breakpoints
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0, // Extra small screens (default: 0px)
      sm: 321, // Small starts at 768px (customized)
      md: 426, // Medium starts at 1024px (customized)
      mdlg: 521,
      lg: 769, // Large starts at 1440px (customized)
      xl: 1025, // Extra large screens (default)
    },
  },
});

function App() {
  useReadData();

  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      <div className="lembest-app-container">
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

export default App;
