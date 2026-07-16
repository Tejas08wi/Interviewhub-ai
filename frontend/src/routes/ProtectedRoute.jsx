import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
  const { auth } = useAuth();

  // User not logged in
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // User logged in but role not allowed
  if (!allowedRoles.includes(auth.role)) {
    return <Navigate to="/login" replace />;
  }

  // Authorized
  return children;
}

export default ProtectedRoute;