import LoadingStates from "../components/LoadingStates";

function Landing() {
  return (
    <>
      <LoadingStates component="filters" />
      <LoadingStates />
      <LoadingStates />
      <LoadingStates component="marketItem" />
      <LoadingStates component="spinner" />
    </>
  );
}

export default Landing;
