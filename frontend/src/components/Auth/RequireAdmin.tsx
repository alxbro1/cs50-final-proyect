import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import type { User } from "../../types/user";

export function RequireAdmin({ children }: { children: React.ReactElement }) {
  const user = useSelector((state: { user: User }) => state.user);
  const location = useLocation();

  if (!user || !user.id) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }
  return children;
}