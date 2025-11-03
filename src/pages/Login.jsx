import Input from "../components/Input";
function Login() {
  return (
    <div className="auth-container">
      <img src="/wordmark_light.png" alt="Kopalet wordmark" />
      {/* <h1>Login</h1> */}
      <Input>Enter your email</Input>
    </div>
  );
}

export default Login;
