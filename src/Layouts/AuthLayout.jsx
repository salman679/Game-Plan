import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50 shadow-xl/30">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}
