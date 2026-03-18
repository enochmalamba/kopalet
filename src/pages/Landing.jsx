import { Link } from "react-router-dom";
function Landing() {
  return (
    <>
      <Link to="/home">Home</Link>
      <Link to="/create">create</Link>
    </>
  );
}

export default Landing;
