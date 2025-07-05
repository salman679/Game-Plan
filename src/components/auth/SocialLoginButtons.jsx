import { Apple, Chrome } from "lucide-react";
import { useFirebaseAuth } from "../../hooks/useFirebaseAuth";

const FacebookIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const SocialLoginButtons = ({ showError = true }) => {
  const {
    signInWithGoogle,
    signInWithFacebook,
    signInWithApple,
    isLoading,
    error,
    clearError,
  } = useFirebaseAuth();

  const handleSocialLogin = (loginFunction) => {
    if (error) clearError();
    loginFunction();
  };

  return (
    <div className="space-y-4">
      {showError && error && (
        <div className="p-3 border border-red-200 rounded-lg bg-red-50">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 text-gray-500 bg-white">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => handleSocialLogin(signInWithGoogle)}
          disabled={isLoading}
          className="flex items-center justify-center p-3 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <Chrome className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
        </button>

        <button
          type="button"
          onClick={() => handleSocialLogin(signInWithFacebook)}
          disabled={isLoading}
          className="flex items-center justify-center p-3 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <FacebookIcon className="text-blue-600 group-hover:text-blue-700" />
        </button>

        <button
          type="button"
          onClick={() => handleSocialLogin(signInWithApple)}
          disabled={isLoading}
          className="flex items-center justify-center p-3 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <Apple className="w-5 h-5 text-gray-800 group-hover:text-black" />
        </button>
      </div>

      {isLoading && (
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 text-sm font-semibold leading-6 text-indigo-500 bg-white rounded-md shadow">
            <svg
              className="w-5 h-5 mr-3 -ml-1 text-indigo-500 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Signing in...
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialLoginButtons;
