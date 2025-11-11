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
          {" "}
          <img src="/logo.png" alt="Kopalet wordmark" />
          <h1>Join Kopalet</h1>
          <p className="muted-text">Create account to get started</p>
          <TextField
            label="Enter email"
            required
            variant="outlined"
            helperText="Enter a valid email address"
          />
          <TextField
            label="Enter birthday"
            required
            variant="outlined"
            helperText="Enter a valid email address"
          />
          <TextField
            label="Create password"
            required
            variant="outlined"
            helperText="Enter a strong password"
          />
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Show password" />
          </FormGroup>
          <p className="muted-text">
            By creating account, you agree to our <Link>Terms</Link> and{" "}
            <Link>Privacy Policy</Link>
          </p>
          <button type="button">Create account</button>{" "}
          <p className="muted-text">
            Already have an account? <Link to={"/login"}>Log in</Link>
          </p>
        </form>
        <div className="auth-form-links">
          <Link>
            Privacy Policy<Icon>open_in_new</Icon>
          </Link>
          <Link>
            Terms<Icon>open_in_new</Icon>
          </Link>
          <Link>
            Help<Icon>open_in_new</Icon>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Signup;
