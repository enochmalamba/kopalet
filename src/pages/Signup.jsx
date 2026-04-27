import { useSession } from "../context/sessionContext";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import AuthPageBottomLinks from "../components/AuthPageBottomLinks";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Collapse from "@mui/material/Collapse";
function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { createAccount, isRegistering, authError, setAuthError } =
    useSession();

  const handleSubmit = (e) => {
    e.preventDefault();

    createAccount(name, email, password);
  };

  return (
    <>
      <div className="auth-container">
        <Snackbar
          open={!!authError}
          autoHideDuration={5000}
          onClose={() => setAuthError(null)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          sx={{
            top: {
              xs: "10px", // Mobile
              sm: "20px", // Desktop and up
            },
          }}
        >
          <Alert
            severity="error"
            variant="outlined"
            onClose={() => setAuthError(null)}
            sx={{ width: "100%" }}
          >
            {authError}
          </Alert>
        </Snackbar>
        <form className="auth-form" onSubmit={handleSubmit}>
          <img src="/wordmark_light.png" alt="Kopalet Wordmark" />

          {/* <Typography>Create account </Typography> */}
          <TextField
            label="Enter your name"
            required
            disabled={isRegistering}
            variant="outlined"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Email"
            placeholder="Enter your email"
            required
            disabled={isRegistering}
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            helperText="Password must be 6 to 12 characters long"
            required
            disabled={isRegistering}
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
          <Typography
            variant="body1"
            style={{
              fontSize: "var(--fs-sm)",
              display: "flex",
              gap: "var(--space-2xs)",
            }}
          >
            Already have an account?
            <Link to={"/login"} className="auth-link">
              Log in
            </Link>
          </Typography>
          <Button
            size="large"
            type="submit"
            fullWidth
            loading={isRegistering}
            loadingPosition="end"
            variant="contained"
          >
            Create account
          </Button>
        </form>
        <AuthPageBottomLinks />
      </div>
    </>
  );
}

export default Signup;
