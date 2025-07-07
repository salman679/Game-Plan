import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, RefreshCw, ArrowLeft, AlertTriangle } from "lucide-react";
import Button from "../ui/Button";

const ErrorPage = ({
  errorCode = "404",
  title = "Page Not Found",
  message = "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
  showHomeButton = true,
  showBackButton = true,
  showRefreshButton = false,
}) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const getErrorIcon = () => {
    switch (errorCode) {
      case "404":
        return (
          <div className="relative">
            <div className="font-bold text-indigo-200 select-none text-8xl">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full">
                <AlertTriangle className="w-8 h-8 text-indigo-600" />
              </div>
            </div>
          </div>
        );
      case "500":
        return (
          <div className="relative">
            <div className="font-bold text-red-200 select-none text-8xl">
              500
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center w-24 h-24 mx-auto bg-gray-100 rounded-full">
            <AlertTriangle className="w-12 h-12 text-gray-600" />
          </div>
        );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="w-full max-w-lg">
        <div className="p-12 text-center bg-white shadow-2xl rounded-3xl">
          {/* Error Icon/Code */}
          <div className="mb-8">{getErrorIcon()}</div>

          {/* Error Title */}
          <h1 className="mb-4 text-3xl font-bold text-gray-900">{title}</h1>

          {/* Error Message */}
          <p className="mb-8 leading-relaxed text-gray-600">{message}</p>

          {/* Action Buttons */}
          <div className="space-y-4">
            {showHomeButton && (
              <Button
                onClick={handleGoHome}
                className="flex items-center justify-center w-full gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                <Home size={18} />
                Go to Dashboard
              </Button>
            )}

            <div className="flex gap-3">
              {showBackButton && (
                <Button
                  onClick={handleGoBack}
                  variant="outline"
                  className="flex items-center justify-center flex-1 gap-2"
                >
                  <ArrowLeft size={16} />
                  Go Back
                </Button>
              )}

              {showRefreshButton && (
                <Button
                  onClick={handleRefresh}
                  variant="outline"
                  className="flex items-center justify-center flex-1 gap-2"
                >
                  <RefreshCw size={16} />
                  Refresh
                </Button>
              )}
            </div>
          </div>

          {/* Additional Help */}
          <div className="pt-6 mt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Need help? Contact our{" "}
              <button className="font-medium text-indigo-600 hover:text-indigo-700">
                support team
              </button>
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute w-20 h-20 bg-indigo-100 rounded-full opacity-50 top-10 left-10 animate-pulse"></div>
        <div
          className="absolute w-16 h-16 bg-purple-100 rounded-full opacity-50 bottom-10 right-10 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute w-12 h-12 bg-pink-100 rounded-full opacity-50 top-1/2 left-5 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
    </div>
  );
};

// Specific error page components
export const NotFoundPage = () => (
  <ErrorPage
    errorCode="404"
    title="Page Not Found"
    message="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
  />
);

export const ServerErrorPage = () => (
  <ErrorPage
    errorCode="500"
    title="Server Error"
    message="We're experiencing some technical difficulties. Our team has been notified and is working on a fix."
    showRefreshButton={true}
  />
);

export const NetworkErrorPage = () => (
  <ErrorPage
    errorCode="Network"
    title="Connection Error"
    message="Unable to connect to our servers. Please check your internet connection and try again."
    showRefreshButton={true}
  />
);

export default ErrorPage;
