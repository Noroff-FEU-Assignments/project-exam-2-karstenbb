import LoginForm from "../components/LoginForm";
import loginpic from "../images/login.jpeg";

const Login = () => {
  return (
    <>
      <LoginForm />
      <img className="login__background" alt="backgroundLogin" src={loginpic} />
    </>
  );
};

export default Login;
