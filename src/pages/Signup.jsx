import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Icon from "../components/Icon";
function Signup() {
  return (
    <>
      <div className="auth-container">
        <form className="auth-form">
          <img src="/logo.png" alt="Kopalet wordmark" className="auth-logo" />
          <h1>Join Kopalet</h1>
          <p className="muted-text">Create account to get started</p>
          <TextField label="Enter email" required variant="outlined" />
          <TextField label="Create password" required variant="outlined" />

          <p>
            By creating account, you agree to our &nbsp;
            <Link to={"/login"} className="auth-switch-link">
              Terms
            </Link>{" "}
            and &nbsp;
            <Link to={"/login"} className="auth-switch-link">
              Privacy Policy
            </Link>
          </p>
          <button type="submit" className="auth-action-btn">
            Create account
          </button>
          <p>
            Already have an account? &nbsp;
            <Link to={"/signup"} className="auth-switch-link">
              Log in
            </Link>
          </p>
        </form>
        <div className="auth-form-links">
          <a href="/" target="_blank" className="auth-form-link">
            Privacy Policy<Icon>open_in_new</Icon>
          </a>
          <a href="/" target="_blank" className="auth-form-link">
            Terms<Icon>open_in_new</Icon>
          </a>
          <a href="/" target="_blank" className="auth-form-link">
            Help<Icon>open_in_new</Icon>
          </a>
        </div>
      </div>
    </>
  );
}

export default Signup;
