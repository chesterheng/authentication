import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const { authenticated } = auth;
  const location = useLocation();

  if (!authenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
