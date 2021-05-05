import LoginForm from "../components/LoginForm";
import loginpic from "../images/login.jpeg";

const Login = () => {
  return (
    <div className="login">
      <LoginForm />
      <img className="login__background" alt="backgroundLogin" src={loginpic} />
    </div>
  );
};

export default Login;
