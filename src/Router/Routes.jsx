import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../Layouts/AuthLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Home />,
      },
    ],
  },
]);
