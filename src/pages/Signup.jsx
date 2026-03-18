import { useSession } from "../context/sessionContext";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import Button from "@mui/material/Button";
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const { createAccount, isRegistering } = useSession();

  const handleSubmit = (e) => {
    e.preventDefault();

    createAccount(email, password);
  };

  return (
    <>
      <div className="auth-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <img src="/logo.png" alt="Kopalet wordmark" className="auth-logo" />
          <h1>Join Kopalet</h1>
          <p className="muted-text">Create account to get started</p>
          <TextField
            label="Enter email"
            required
            disabled={isRegistering}
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Create password"
            required
            disabled={isRegistering}
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            loading={isRegistering}
            loadingPosition="end"
            variant="contained"
          >
            Create account
          </Button>
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
