import { useState } from "react";
import { useDispatch } from "react-redux";
import SocialLoginButtons from "./SocialLoginButtons";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { useResendOtpMutation, useSignupMutation } from "../../../app/authApi";
import { setCurrentStep, setEmail } from "../../../features/authSlice";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signup, { isLoading }] = useSignupMutation();
  const [resendOtp] = useResendOtpMutation();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.userName.trim()) {
      newErrors.userName = "User name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!acceptTerms) {
      newErrors.terms = "Please accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await signup({
        username: formData.userName,
        email: formData.email,
        password: formData.password,
      }).unwrap();

      // Manually resend OTP after signup if not done by backend
      await resendOtp({
        email: formData.email,
      }).unwrap();

      navigate("/verification");

      dispatch(setEmail(formData.email));
      dispatch(setCurrentStep("verification"));
    } catch (error) {
      console.error("Signup failed:", error);
      setErrors({
        general: error.message || "Signup failed. Please try again.",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <Card>
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-medium text-gray-900">
          SIGN UP to Account
        </h1>
        <p className="pt-2 font-sans text-sm font-normal text-gray-600">
          Please enter your email and password to continue
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.general && (
          <div className="p-3 border border-red-200 rounded-lg bg-red-50">
            <p className="text-sm text-red-600">{errors.general}</p>
          </div>
        )}

        <Input
          label="User Name"
          name="userName"
          value={formData.userName}
          onChange={handleInputChange}
          error={errors.userName}
          placeholder="Enter your name"
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          placeholder="example@email.com"
        />

        <Input
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          placeholder="••••••••"
          showPasswordToggle
          isPasswordVisible={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />

        <Input
          label="Confirm password"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={handleInputChange}
          error={errors.confirmPassword}
          placeholder="••••••••"
          showPasswordToggle
          isPasswordVisible={showConfirmPassword}
          onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
        />

        <div className="flex items-center">
          <input
            type="checkbox"
            id="terms"
            checked={acceptTerms}
            onChange={(e) => {
              setAcceptTerms(e.target.checked);
              if (errors.terms) {
                setErrors((prev) => ({ ...prev, terms: "" }));
              }
            }}
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label htmlFor="terms" className="ml-2 text-xs text-gray-600">
            By Creating An Account, I Accept The{" "}
            <span className="text-indigo-600">Terms & Conditions</span> &{" "}
            <span className="text-indigo-600">Privacy Policy</span>
          </label>
        </div>
        {errors.terms && (
          <p className="-mt-4 text-sm text-red-600">{errors.terms}</p>
        )}

        <Button type="submit" isLoading={isLoading} className="w-full">
          SIGN UP
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already Have An Account?{" "}
            <Link to={"/"}>
              <button
                type="button"
                onClick={() => dispatch(setCurrentStep("login"))}
                className="text-indigo-600 cursor-pointer hover:text-indigo-500"
              >
                Login
              </button>
            </Link>
          </p>
        </div>

        <SocialLoginButtons />
      </form>
    </Card>
  );
};

export default SignupForm;
