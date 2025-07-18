import { useSelector } from "react-redux";
import SignupForm from "./signup/SignupForm";
import VerificationForm from "./signup/VerificationForm";
import PasswordResetForm from "./login/PasswordResetForm";
import SuccessScreen from "./login/SuccessScreen";
import LoginForm from "./login/LoginForm";

const AuthFlow = () => {
  const { currentStep } = useSelector((state) => state.auth);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "signup":
        return <SignupForm />;
      case "verification":
        return <VerificationForm />;
      case "reset-password":
        return <PasswordResetForm />;
      case "success":
        return <SuccessScreen />;
      case "login":
        return <LoginForm />;
      default:
        return <SignupForm />;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="w-full max-w-md">{renderCurrentStep()}</div>
    </div>
  );
};

export default AuthFlow;
