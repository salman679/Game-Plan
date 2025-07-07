import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "../../../app/authApi";
import { setCurrentStep } from "../../../features/authSlice";

const VerificationForm = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.auth);
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleInputChange = (index, value) => {
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError("");

    if (value) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const verificationCode = code.join("");
    console.log(typeof verificationCode);

    if (verificationCode.length !== 6) {
      setError("Please enter the complete verification code");
      return;
    }

    try {
      await verifyOtp({
        email,
        otp: verificationCode,
      }).unwrap();

      setSuccessMessage("Email verified successfully!");
      navigate("/");
      setTimeout(() => {
        dispatch(setCurrentStep("login"));
      }, 1500);
    } catch (error) {
      console.error("OTP verification failed:", error);
      setError(error.message || "Invalid verification code");
    }
  };

  const handleResendCode = async () => {
    try {
      await resendOtp({ email }).unwrap();
      setSuccessMessage("Verification code sent successfully!");
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Resend OTP failed:", error);
      setError(error.message || "Failed to resend code");
    }
  };

  return (
    <Card>
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mx-auto mb-4 ">
          <img src="/src/assets/Gameplan. 2-01-01 1.png" alt="" />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Verification Code
        </h1>
        <p className="text-gray-600">
          We've sent a verification code to
          <br />
          <span className="font-medium">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center space-x-3">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`w-12 h-12 text-center text-lg font-semibold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                error ? "border-red-500" : "border-gray-300"
              }`}
            />
          ))}
        </div>

        {error && <p className="text-sm text-center text-red-600">{error}</p>}

        {successMessage && (
          <p className="text-sm text-center text-green-600">{successMessage}</p>
        )}

        <Button type="submit" isLoading={isLoading} className="w-full">
          VERIFY CODE
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Didn't receive the code?{" "}
            <button
              type="button"
              onClick={handleResendCode}
              disabled={isResending}
              className="font-medium text-indigo-600 hover:text-indigo-500 disabled:opacity-50"
            >
              {isResending ? "Sending..." : "Resend Code"}
            </button>
          </p>
        </div>
      </form>
    </Card>
  );
};

export default VerificationForm;
