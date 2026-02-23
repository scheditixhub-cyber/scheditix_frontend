import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = useAppSelector((state) => state?.scheditixUser?.userToken);
  console.log(token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
