import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { useResetPasswordMutation } from "../../../app/authApi";
import { setCurrentStep } from "../../../features/authSlice";

const PasswordResetForm = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.auth);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await resetPassword({
        email,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      }).unwrap();
      dispatch(setCurrentStep("success"));
    } catch (error) {
      console.error("Password reset failed:", error);
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
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Set new Password
        </h1>
        <p className="text-sm font-normal text-gray-600">
          Create a new password.
          <br />
          Ensure it differs from previous one.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="New Password"
          name="newPassword"
          type={showPassword ? "text" : "password"}
          value={formData.newPassword}
          onChange={handleInputChange}
          error={errors.newPassword}
          placeholder="••••••••"
          showPasswordToggle
          isPasswordVisible={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />

        <Input
          label="Confirm new Password"
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

        <Button type="submit" isLoading={isLoading} className="w-full">
          CONFIRM PASSWORD
        </Button>
      </form>
    </Card>
  );
};

export default PasswordResetForm;
