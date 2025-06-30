import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { AuthContextProvider } from "./middleware/context/AuthContext.jsx";

import AppRoutes from "./utils/routes";
import { store } from "./utils/store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthContextProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthContextProvider>
  </Provider>
);
