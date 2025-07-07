import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Card from "../../ui/Card";
import { useLoginMutation } from "../../../app/authApi";
import { setCurrentStep, setToken, setUser } from "../../../features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import RememberPasswordCheckbox from "../../ui/CheckBox";
import SocialLoginButtons from "../signup/SocialLoginButtons";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const validateForm = () => {
    const newErrors = {};

    // if (!formData.email.trim()) {
    //   newErrors.email = "Email is required";
    // } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    //   newErrors.email = "Please enter a valid email";
    // }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await login(formData).unwrap();

      navigate("/dashboard");

      if (response.user && response.token) {
        dispatch(setUser(response.user));
        dispatch(setToken(response.token));
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrors({
        general: error.message || "Invalid email or password",
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
        <div className="flex items-center justify-center mx-auto mb-4 ">
          <img src="/src/assets/Gameplan. 2-01-01 1.png" alt="" />
        </div>
        <h1 className="mb-2 text-4xl font-medium text-gray-900">
          Login to Account
        </h1>
        <p className="font-sans text-sm font-normal text-gray-600">
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
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          placeholder="Enter your email address"
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

        <div className="flex items-center justify-between">
          <RememberPasswordCheckbox />
          <Link to={"/forget-password"}>
            <p className="text-right text-red-400 w-fit">Forgot Password?</p>
          </Link>
        </div>

        <Button type="submit" isLoading={isLoading} className="w-full">
          LOG IN
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to={"/register"}>
              <button
                type="button"
                onClick={() => dispatch(setCurrentStep("signup"))}
                className="font-medium text-indigo-600 cursor-pointer hover:text-indigo-500"
              >
                Sign up
              </button>
            </Link>
          </p>
        </div>

        <SocialLoginButtons />
      </form>
    </Card>
  );
};

export default LoginForm;
