import useUpdateActiveNavigation from "../../hook/useUpdateActiveNavigation ";

import { PageContainer } from "../../components/display/Container";
import Signup from "../../modules/authentication/Signup";

function Registration() {
  useUpdateActiveNavigation("registration");

  return (
    <div className="registration-page-container">
      <PageContainer>
        <Signup />
      </PageContainer>
    </div>
  );
}

export default Registration;
