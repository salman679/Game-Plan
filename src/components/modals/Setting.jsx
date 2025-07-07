import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { X } from "lucide-react";
import Button from "../ui/Button";
import {
  useBuySubscriptionMutation,
  useUpdateSubscriptionMutation,
} from "../../app/authApi";
import { addNotification, setShowSettingsModal } from "../../features/uiSlice";

const SettingsModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const [subscriptionPlan] = useState("Standard");
  const [buySubscription, { isLoading: isBuying }] =
    useBuySubscriptionMutation();
  const [{ isLoading: isUpdating }] = useUpdateSubscriptionMutation();

  const handleUpdate = async () => {
    try {
      await buySubscription({
        subscription_plan: subscriptionPlan,
      }).unwrap();

      dispatch(
        addNotification({
          type: "success",
          message: "Subscription updated successfully!",
        })
      );

      dispatch(setShowSettingsModal(false));
    } catch (error) {
      dispatch(
        addNotification({
          type: "error",
          message: error.message || "Failed to update subscription",
        })
      );
    }
  };

  const handleCancel = () => {
    dispatch(setShowSettingsModal(false));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-50 bg-white/30 backdrop-blur-xs">
      <div className="w-full max-w-md mx-auto bg-white shadow-2xl rounded-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 text-white transition-colors bg-blue-500 rounded-full hover:bg-blue-600"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="mb-4 text-lg font-medium text-gray-900">
              Subscription Details
            </h3>

            <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-semibold text-gray-900">
                  Standard
                </span>
                <span className="text-2xl font-bold text-gray-900">80$</span>
              </div>
              <p className="text-sm text-gray-600">expire date: 11/09/24</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleUpdate}
              isLoading={isBuying || isUpdating}
              className="flex-1 text-white bg-green-500 hover:bg-green-600"
            >
              Update
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="flex-1 text-black bg-red-500 border-red-500 hover:text-white hover:bg-red-600"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
