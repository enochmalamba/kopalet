import { useSession } from "../context/sessionContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggingIn, isAuthenticated, login, authError } = useSession();

  if (isAuthenticated) {
    navigate("/home");
  }

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <>
      <div className="auth-container">
        {authError ? (
          <Snackbar
            autoHideDuration={5000}
            open={authError}
            anchorOrigin={{ vertical: "top", horizontal: "centre" }}
          >
            <Alert variant="outlined" severity="error">
              {authError}
            </Alert>
          </Snackbar>
        ) : (
          ""
        )}
        <form onSubmit={handleLogin}>
          <img src="/wordmark_light.png" alt="Kopalet Wordmark" />
          <TextField
            label="Enter email"
            required
            disabled={isLoggingIn}
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />

          <TextField
            label="Enter password"
            required
            disabled={isLoggingIn}
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <p>
            By registering or logging in, you consent to Kopalet's Terms of use
            and Privacy Policy
          </p>
          <div className="auth-action-text">
            <span>
              <Link color="inherit">Forgot password</Link>
            </span>
            <span>
              <Link to="/signup" color="inherit">
                Create account
              </Link>
            </span>
          </div>
          <Button
            type="submit"
            variant="contained"
            loadingPosition="end"
            loading={isLoggingIn}
            fullWidth
          >
            {isLoggingIn ? "Logging in.." : "Log In"}
          </Button>
        </form>
      </div>
    </>
  );
}

export default Login;
