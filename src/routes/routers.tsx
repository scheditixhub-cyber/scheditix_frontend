import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";
import { ProtectedRoute } from "./ProtectedRoutes";
import EventDetails from "../pages/home/EventDetails";
import TicketCheckout from "../pages/home/TicketCheckout";
import EventTicket from "../pages/home/EventTicket";
// import LandingPage from "@/pages/home/LandingPage";

const LandingPage = lazy(() => import("../pages/home/LandingPage"));
const NotFound = lazy(() => import("../pages/others/NotFound"));
const ErrorPage = lazy(() => import("../pages/others/NotFound"));
const DashboardLayout = lazy(() => import("../pages/layouts/DashboardLayout"));
const DashboardOverview = lazy(() => import("../pages/dashboard/Overview"));
const Login = lazy(() => import("../pages/auth/Login"));
const Signup = lazy(() => import("../pages/auth/Signup"));
const VerifyEmail = lazy(() => import("../pages/auth/VerifyEmail"));
const ForgetPassword = lazy(() => import("../pages/auth/ForgetPassword"));
const ForgetVerification = lazy(
  () => import("../pages/auth/ForgetVerification")
);
const ResetPassword = lazy(() => import("../pages/auth/ResetPassword"));
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
    path: "verify-email",
    element: <VerifyEmail />,
    errorElement: <ErrorPage />,
  },
  {
    path: "forgot-password",
    element: <ForgetPassword />,
    errorElement: <ErrorPage />,
  },
  {
    path: "reset-password-verification",
    element: <ForgetVerification />,
    errorElement: <ErrorPage />,
  },
  {
    path: "reset-password",
    element: <ResetPassword />,
    errorElement: <ErrorPage />,
  },
  {
    path: "event_details/:id",
    element: <EventDetails />,
    errorElement: <ErrorPage />,
  },
  {
    path: "ticket_checkout/:id",
    element: <TicketCheckout />,
    errorElement: <ErrorPage />,
  },
  {
    path: "event_ticket/:id",
    element: <EventTicket />,
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
