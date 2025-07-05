import { Link } from "react-router";

export const Error = ({ onRetry }) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      // Default retry behavior
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#007A8C]/50 to-[#005a6b] flex justify-center items-center">
      <div className="w-11/12 max-w-md p-10 text-center text-white border shadow-2xl rounded-3xl bg-white/10 backdrop-blur-lg border-white/20">
        <div className="mb-5 text-6xl text-red-400">⚠️</div>
        <h2 className="mb-4 text-2xl font-light">Oops! Something went wrong</h2>
     

        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={handleRetry}
            className="bg-white/20 text-white border border-white/30 px-7 py-3 rounded-full hover:bg-white/30 hover:-translate-y-0.5 transition-all duration-300"
          >
            Try Again
          </button>
          <Link 
            to="/"
            className="bg-white/20 text-white border border-white/30 px-7 py-3 rounded-full hover:bg-white/30 hover:-translate-y-0.5 transition-all duration-300 inline-block text-decoration-none"
          >
            Go Home
          </Link>
        </div>
      </div>   
    </div>
  );
};