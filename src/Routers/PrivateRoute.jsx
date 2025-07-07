import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { isAuthenticated, token } = useSelector((state) => state.auth);

  const location = useLocation();

  if (!isAuthenticated || !token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
