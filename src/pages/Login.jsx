import { Navigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

function Login({ isAuthenticated }) {
  if (isAuthenticated) return <Navigate to="/" replace />;

  return <LoginForm />;
}

export default Login;
