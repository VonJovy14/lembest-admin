import "./App.scss";
import "./colors.scss";
import "./fonts.scss";

import { Outlet } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Header from "../../modules/Header";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 321,
      md: 426,
      mdlg: 521,
      lg: 769,
      xl: 1025,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="lembest-admin-app-container">
        <Header />
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

export default App;
