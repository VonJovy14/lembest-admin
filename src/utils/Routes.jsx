import { Routes, Route } from "react-router-dom";

import App from "./app/App";

import Home from "../page/common/Home";
import Signin from "../page/common/Login";
import Registration from "../page/common/Registration";
import NotFound from "../page/common/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<App />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Signin />} />
        <Route path="register" element={<Registration />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
