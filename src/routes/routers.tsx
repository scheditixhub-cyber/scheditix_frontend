import {createBrowserRouter, Navigate} from "react-router-dom";
import {lazy} from "react";
import {ProtectedRoute} from "./ProtectedRoutes";
// import LandingPage from "@/pages/home/LandingPage";

const LandingPage = lazy(() => import("@/pages/home/LandingPage"));
const NotFound = lazy(() => import("@/pages/others/NotFound"));
const ErrorPage = lazy(() => import("@/pages/others/Error"));
const DashboardLayout = lazy(() => import("@/pages/layouts/DashboardLayout"));
const DashboardOverview = lazy(() => import("@/pages/dashboard/Overview"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Signup = lazy(() => import("@/pages/auth/Signup"));
export const routers = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
        errorElement: <ErrorPage />,
        index: true,
    },
    {
        path: "login",
        element: <Login />,
        errorElement: <ErrorPage />,
    },
    {
        path: "signup",
        element: <Signup />,
        errorElement: <ErrorPage />,
    },
    {
        path: "404",
        element: <NotFound />,
    },
    {
        path: "*",
        element: <Navigate to="/404" replace />,
    },
    {
        path: "dashboard",
        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: "overview",
                element: <DashboardOverview />,
                errorElement: <ErrorPage />,
            },
        ],
    },
]);
