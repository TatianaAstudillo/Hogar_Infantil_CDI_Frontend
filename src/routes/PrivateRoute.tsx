import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

export const PrivateRoute = ({ children }: any) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
  
};
