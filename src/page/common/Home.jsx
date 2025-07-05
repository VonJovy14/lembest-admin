import useUpdateActiveNavigation from "../../hook/useUpdateActiveNavigation ";

import { PageContainer } from "../../components/display/Container";

function Home() {
  useUpdateActiveNavigation("home");

  return (
    <div className="home-page-container">
      <PageContainer>
        <div>Sample</div>
        <div>Sample</div>
        <div>Sample</div>
        <div>Sample</div>
      </PageContainer>
    </div>
  );
}

export default Home;
