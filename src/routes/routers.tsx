import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";
import { ProtectedRoute } from "./ProtectedRoutes";
import ManageLayout from "../pages/layouts/ManageLayout";
import EventDetails from "../pages/home/EventDetails";
import TicketCheckout from "../pages/home/TicketCheckout";
import EventTicket from "../pages/home/EventTicket";
// import LandingPage from "@/pages/home/LandingPage";

const LandingPage = lazy(() => import("../pages/home/LandingPage"));
const NotFound = lazy(() => import("../pages/others/NotFound"));
const ErrorPage = lazy(() => import("../pages/others/NotFound"));
const DashboardLayout = lazy(() => import("../pages/layouts/DashboardLayout"));
const EventDetails = lazy(() => import("../pages/dashboard/EventDetails"));
const ManageEvents = lazy(() => import("../pages/dashboard/ManageEvents"));
const DashboardOverviewMain = lazy(
  () => import("../pages/dashboard/OverviewMain")
);
const Login = lazy(() => import("../pages/auth/Login"));
const Signup = lazy(() => import("../pages/auth/Signup"));
const VerifyEmail = lazy(() => import("../pages/auth/VerifyEmail"));
const ForgetPassword = lazy(() => import("../pages/auth/ForgetPassword"));
const ForgetVerification = lazy(
  () => import("../pages/auth/ForgetVerification")
);
const ResetPassword = lazy(() => import("../pages/auth/ResetPassword"));
const Settings = lazy(() => import("../pages/dashboard/Settings"));
const CheckIn = lazy(() => import("../pages/dashboard/CheckIn"));
const CreateEvent = lazy(() => import("../pages/dashboard/CreateEvent"));
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
        element: <DashboardOverviewMain />,
        errorElement: <ErrorPage />,
      },
      {
        path: "manage",
        element: <ManageLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "events",
            element: <ManageEvents />,
            errorElement: <ErrorPage />,
          },
          {
            path: "event/:id",
            element: <EventDetails />,
            errorElement: <ErrorPage />,
          },
          {
            path: "event/check-in/:id",
            element: <CheckIn />,
            errorElement: <ErrorPage />,
          },
        ],
      },

      {
        path: "settings",
        element: <Settings />,
        errorElement: <ErrorPage />,
      },
      {
        path: "create-event",
        element: <CreateEvent />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);
