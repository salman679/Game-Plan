import { useState } from "react";
import { useDispatch } from "react-redux";

import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { useForgotPasswordMutation } from "../../../app/authApi";
import { setCurrentStep, setEmail } from "../../../features/authSlice";
import { Link } from "react-router-dom";

const ForgotPasswordForm = () => {
  const [email, setEmailInput] = useState("");
  const [errors, setErrors] = useState({});
  const [isEmailSent, setIsEmailSent] = useState(false);

  const dispatch = useDispatch();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await forgotPassword({ email }).unwrap();
      dispatch(setEmail(email));
      setIsEmailSent(true);
    } catch (error) {
      console.error("Forgot password failed:", error);
      setErrors({
        general:
          error.message || "Failed to send reset email. Please try again.",
      });
    }
  };

  const handleInputChange = (e) => {
    setEmailInput(e.target.value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: "" }));
    }
  };

  if (isEmailSent) {
    return (
      <Card>
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            Check Your Email
          </h1>
          <p className="text-gray-600">
            We've sent a password reset link to
            <br />
            <span className="font-medium text-gray-900">{email}</span>
          </p>
        </div>

        <div className="space-y-6">
          <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
            <p className="text-sm text-blue-800">
              <strong>Didn't receive the email?</strong>
              <br />
              Check your spam folder or try again with a different email
              address.
            </p>
          </div>

          <Button
            onClick={() => setIsEmailSent(false)}
            variant="outline"
            className="w-full"
          >
            Try Different Email
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => dispatch(setCurrentStep("login"))}
              className="inline-flex items-center text-sm text-gray-600 transition-colors hover:text-indigo-600"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Login
            </button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full">
          <Mail className="w-8 h-8 text-indigo-600" />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Forgot Password?
        </h1>
        <p className="text-gray-600">
          Don't worry! It happens. Please enter the email
          <br />
          address linked with your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.general && (
          <div className="p-3 border border-red-200 rounded-lg bg-red-50">
            <p className="text-sm text-red-600">{errors.general}</p>
          </div>
        )}

        <Input
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={handleInputChange}
          error={errors.email}
          placeholder="Enter your email"
          icon={<Mail size={16} />}
        />

        <Button type="submit" isLoading={isLoading} className="w-full">
          SEND RESET EMAIL
        </Button>

        <div className="text-center">
          <Link to="/">
            <button
              type="button"
              className="inline-flex items-center text-sm text-gray-600"
            >
              Remember Password?
              <span className="flex items-center underline transition-colors cursor-pointer hover:text-indigo-600">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Login
              </span>
            </button>
          </Link>
        </div>
      </form>
    </Card>
  );
};

export default ForgotPasswordForm;
