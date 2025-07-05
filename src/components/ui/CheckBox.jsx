import React, { useState } from "react";

/**
 * RememberPasswordCheckbox Component
 *
 * A simple checkbox component for "Remember Password" functionality,
 * styled with Tailwind CSS.
 *
 * @returns {JSX.Element} The rendered checkbox component.
 */
const RememberPasswordCheckbox = () => {
  // State to manage the checked status of the checkbox
  const [isChecked, setIsChecked] = useState(false);

  /**
   * Handles the change event of the checkbox.
   * Toggles the isChecked state.
   */
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex items-center space-x-2 w-fit">
      {/* Checkbox Input */}
      <input
        id="remember-password" // Unique ID for the checkbox
        type="checkbox"
        checked={isChecked} // Controlled component: binds to state
        onChange={handleCheckboxChange} // Event handler for changes
        // Tailwind CSS classes for styling the checkbox
        className="w-4 h-4 text-indigo-600 transition-colors duration-200 ease-in-out border-gray-300 rounded cursor-pointer form-checkbox focus:ring-indigo-500 checked:bg-indigo-600 checked:border-transparent focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-indigo-500 dark:focus:ring-offset-gray-800"
      />
      {/* Label for the checkbox */}
      <label
        htmlFor="remember-password" // Associates label with the input via ID
        // Tailwind CSS classes for styling the label text
        className="font-sans text-xs font-normal text-gray-600 cursor-pointer select-none sm:text-lg dark:text-gray-300"
      >
        Remember Password
      </label>
    </div>
  );
};

export default RememberPasswordCheckbox;
