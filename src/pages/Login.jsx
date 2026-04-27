import { useSession } from "../context/sessionContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import AuthPageBottomLinks from "../components/AuthPageBottomLinks";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggingIn, isAuthenticated, login, authError, setAuthError } =
    useSession();

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
            open={authError}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            sx={{ bgcolor: "var(--danger)" }}
          >
            <Alert
              variant="filled"
              onClose={() => {
                setAuthError(null);
              }}
              sx={{ bgcolor: "var(--danger)" }}
              severity="error"
            >
              {authError}
            </Alert>
          </Snackbar>
        ) : null}
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
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Typography variant="body2">
            By registering or logging in, you consent to Kopalet's Terms of use
            and Privacy Policy
          </Typography>
          <div className="auth-action-text">
            <span>
              <Link color="inherit">Forgot password?</Link>
            </span>
            <span>
              <Link to="/signup" color="inherit">
                Create account
              </Link>
            </span>
          </div>
          <Button
            size="large"
            type="submit"
            variant="contained"
            loadingPosition="end"
            loading={isLoggingIn}
            fullWidth
          >
            {isLoggingIn ? "Logging in.." : "Log In"}
          </Button>
        </form>
        <AuthPageBottomLinks />
      </div>
    </>
  );
}

export default Login;
