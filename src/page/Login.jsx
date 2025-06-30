import "./login.scss";

import useUpdateActiveNavigation from "../middleware/hooks/useUpdateActiveNavigation ";

import SignIn from "./authentication/SignIn";

import { ModuleContainer } from "../modules/Container";

function Login() {
  useUpdateActiveNavigation("login");

  return (
    <div className="login-page-container">
      <div className="login-page-wrapper">
        <div className="login-page-sign-in-container">
          <ModuleContainer color="orange">
            <ModuleContainer color="white">
              <SignIn />
            </ModuleContainer>
          </ModuleContainer>
        </div>
      </div>
    </div>
  );
}

export default Login;
