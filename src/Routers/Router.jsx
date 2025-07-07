import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../Layouts/AuthLayout";
import LoginForm from "../components/auth/login/LoginForm";
import ForgotPasswordForm from "../components/auth/login/ForgotPasswordForm";
import PasswordResetForm from "../components/auth/login/PasswordResetForm";
import VerificationForm from "../components/auth/signup/VerificationForm";
import SuccessScreen from "../components/auth/login/SuccessScreen";
import DashboardLayout from "../Layouts/DashboardLayout";
import ErrorPage from "../components/error/Error";
import SignupForm from "../components/auth/signup/SignupForm";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
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
        path: "/forget-password",
        element: <ForgotPasswordForm />,
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
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
  },
]);
