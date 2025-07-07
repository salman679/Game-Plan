import React, { forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = forwardRef(
  (
    {
      label,
      error,
      showPasswordToggle,
      isPasswordVisible,
      onTogglePassword,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            className={`w-full px-4 py-3 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
              error
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : ""
            } ${showPasswordToggle ? "pr-12" : ""} ${className}`}
            {...props}
          />
          {showPasswordToggle && (
            <button
              type="button"
              className="absolute text-gray-500 transition-colors transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-700"
              onClick={onTogglePassword}
            >
              {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
