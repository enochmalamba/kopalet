import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";

function Login() {
  return (
    <>
      <div className="auth-container">
        <form className="auth-form">
          {" "}
          <img src="/logo.png" alt="Kopalet wordmark" />
          <h1>Welcome back</h1>
          <p className="muted-text">Log into your account</p>
          <TextField
            label="Enter your email"
            required
            variant="outlined"
            helperText="Enter the email you used to create account"
          />
          <button type="button">Continue</button>{" "}
          <p className="muted-text">
            Don't have an account? <Link>Create</Link>
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
      <div className="auth-container">
        <form className="auth-form">
          {" "}
          <img src="/logo.png" alt="Kopalet wordmark" />
          <h1>Confirm it's you</h1>
          <div className="auth-email-preview">
            <p>
              <Icon>account_circle</Icon>xml@kopalet.com
            </p>{" "}
            <Icon>edit_square</Icon>
          </div>
          <p className="muted-text">
            To avoid your account being accessed by someone else, enter your
            password to verify it's you
          </p>
          <TextField label="Enter password" required variant="outlined" />
          <p className="muted-text">
            <Link>Forgot password?</Link>
          </p>
          <button type="button">Log in</button>{" "}
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

export default Login;
