import { Navigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { currentUser } = useApp();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && currentUser.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
