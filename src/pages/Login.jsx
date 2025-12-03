import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      {/* <div className="auth-container">
        <form className="auth-form">
          {" "}
          <img src="/logo.png" alt="Kopalet wordmark" className="auth-logo" />
          <h1>Welcome back</h1>
          <p>Log into your account</p>
          <TextField
            label="Enter your email"
            required
            variant="outlined"
            helperText="Enter the email you used to create account"
          />
          <button type="submit" className="auth-action-btn">
            Continue
          </button>{" "}
          <p>
            Don't have an account?{" "}
            <Link to={"/signup"} className="auth-switch-link">
              Create
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
      </div> */}
      <div className="auth-container">
        <form className="auth-form">
          {" "}
          <img src="/logo.png" alt="Kopalet wordmark" className="auth-logo" />
          <h1>Log in</h1>
          <p>To confirm it's you, enter your password</p>
          <div className="auth-email-preview">
            <p>
              <Icon>account_circle</Icon>xml@kopalet.com
            </p>{" "}
            <Icon>edit_square</Icon>
          </div>
          {/* <TextField label="Enter password" required variant="outlined" /> */}
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <Icon>visibility</Icon>
                    ) : (
                      <Icon>visibility_off</Icon>
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <p>
            <Link to={"/"} className="auth-switch-link">
              Forgot password?
            </Link>
          </p>
          <button type="submit" className="auth-action-btn">
            Log in
          </button>{" "}
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

export default Login;
