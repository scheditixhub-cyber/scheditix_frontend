import {Navigate} from "react-router-dom";
// import { useAppSelector } from '@/stores/hooks';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    // const { token } = useAppSelector((state) => state.auth);
    const token = false;

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};
