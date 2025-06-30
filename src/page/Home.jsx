import useUpdateActiveNavigation from "../middleware/hooks/useUpdateActiveNavigation ";

function Home() {
  useUpdateActiveNavigation("home");

  return <div>Home</div>;
}

export default Home;
