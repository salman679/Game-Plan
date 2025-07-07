import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import emailjs from "@emailjs/browser";

import { X, Mail, Send, CheckCircle } from "lucide-react";
import { addNotification } from "../../features/uiSlice";
import Button from "../ui/Button";

const SupportModal = ({ isOpen, onClose }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: user?.email || "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // EmailJS configuration
  const EMAILJS_SERVICE_ID =
    import.meta.env.VITE_EMAILJS_SERVICE_ID || "your_service_id";
  const EMAILJS_TEMPLATE_ID =
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "your_template_id";
  const EMAILJS_PUBLIC_KEY =
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "your_public_key";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.description.trim()) {
      dispatch(
        addNotification({
          type: "error",
          message: "Please fill in all fields",
        })
      );
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      dispatch(
        addNotification({
          type: "error",
          message: "Please enter a valid email address",
        })
      );
      return;
    }

    setIsLoading(true);

    try {
      // Initialize EmailJS if not already done
      if (!window.emailjs) {
        emailjs.init(EMAILJS_PUBLIC_KEY);
      }

      // Prepare template parameters
      const templateParams = {
        from_email: formData.email,
        user_name: user?.userName || "User",
        user_id: user?.id || "Unknown",
        message: formData.description,
        to_email: "support@gameplan.com", // Your support email
        reply_to: formData.email,
        timestamp: new Date().toLocaleString(),
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      if (response.status === 200) {
        setIsSuccess(true);

        dispatch(
          addNotification({
            type: "success",
            message:
              "Support request sent successfully! We'll get back to you soon.",
          })
        );

        // Auto close after 3 seconds
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("EmailJS Error:", error);

      let errorMessage = "Failed to send support request. Please try again.";

      if (error.text) {
        errorMessage = `Email service error: ${error.text}`;
      } else if (error.message) {
        errorMessage = error.message;
      }

      dispatch(
        addNotification({
          type: "error",
          message: errorMessage,
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-50 bg-white/30 backdrop-blur-xs">
        <div className="w-full max-w-md mx-auto bg-white shadow-2xl rounded-2xl">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Support Request Sent
            </h2>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 text-white transition-colors bg-blue-500 rounded-full hover:bg-blue-600"
            >
              <X size={16} />
            </button>
          </div>

          <div className="p-6 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>

            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Request Sent Successfully!
            </h3>

            <p className="mb-6 text-gray-600">
              Thank you for contacting us. We've received your support request
              and will get back to you within 24 hours.
            </p>

            <div className="p-4 mb-6 border border-blue-200 rounded-lg bg-blue-50">
              <p className="text-sm text-blue-800">
                <strong>What's next?</strong>
                <br />
                Our support team will review your request and respond to{" "}
                <strong>{formData.email}</strong> soon.
              </p>
            </div>

            <Button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-50 bg-white/30 backdrop-blur-xs">
      <div className="w-full max-w-md mx-auto bg-white shadow-2xl rounded-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Help & Support
          </h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 text-white transition-colors bg-blue-500 rounded-full hover:bg-blue-600"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Your Email
            </label>
            <div className="relative">
              <Mail
                className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                size={20}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter Email"
                className="w-full py-3 pl-10 pr-4 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your issue or question in detail..."
              rows={4}
              className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Please provide as much detail as possible to help us assist you
              better.
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h4 className="mb-2 text-sm font-medium text-gray-900">
              Before you submit:
            </h4>
            <ul className="space-y-1 text-xs text-gray-600">
              <li>• Check our FAQ section for common questions</li>
              <li>• Include relevant details about your issue</li>
              <li>• We typically respond within 24 hours</li>
            </ul>
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            className="flex items-center justify-center w-full gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            {isLoading ? (
              "Sending..."
            ) : (
              <>
                <Send size={16} />
                Send Support Request
              </>
            )}
          </Button>

          <p className="text-xs text-center text-gray-500">
            By submitting this form, you agree to our privacy policy and terms
            of service.
          </p>
        </form>
      </div>
    </div>
  );
};

export default SupportModal;
