import useUpdateActiveNavigation from "../../hook/useUpdateActiveNavigation ";

import {
  PageContainer,
  ContentContainer,
} from "../../components/display/Container";
import Signin from "../../modules/authentication/Signin";

import { Grid } from "@mui/material";

function Login() {
  useUpdateActiveNavigation("login");

  return (
    <div className="Login-container">
      <PageContainer>
        <ContentContainer color="red">
          <Grid container>
            <Grid size={{ xs: 12, mdlg: 7 }}>
              <span>sdg</span>
            </Grid>

            <Grid size={{ xs: 12, mdlg: "grow" }}>
              <Signin />
            </Grid>
          </Grid>
        </ContentContainer>
      </PageContainer>
    </div>
  );
}

export default Login;
