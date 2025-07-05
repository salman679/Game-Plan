import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import { Error } from "../components/error/Error";
import Login from "../Pages/auth/Login";
import Register from "../Pages/auth/Register";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";
import PasswordResetForm from "../components/auth/PasswordResetForm";
import VerificationForm from "../components/auth/VerificationForm";
import SuccessScreen from "../components/auth/SuccessScreen";
import DashboardLayout from "../Layouts/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <LoginForm />,
      },
      {
        path: "/register",
        element: <SignupForm />,
      },
      {
        path: "/password-reset",
        element: <PasswordResetForm />,
      },
      {
        path: "/verification",
        element: <VerificationForm />,
      },
      {
        path: "/success-screen",
        element: <SuccessScreen />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
  },
]);
