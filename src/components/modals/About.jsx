import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { X } from "lucide-react";
import {
  useCreateUserAboutMutation,
  useGetUserProfileQuery,
} from "../../app/authApi";
import { addNotification } from "../../features/uiSlice";
import { setUser } from "../../features/authSlice";
import Button from "../ui/Button";

const AboutModal = ({ onClose, isOpen }) => {
  const { showAboutModal } = useSelector((state) => state.ui);
  const { data: user } = useGetUserProfileQuery();
  const dispatch = useDispatch();

  const [updateProfile, { isLoading: isUpdating }] =
    useCreateUserAboutMutation();
  const {
    data: profileData,
    isLoading: isLoadingProfile,
    refetch,
  } = useGetUserProfileQuery(undefined, {
    skip: !showAboutModal,
  });

  const [formData, setFormData] = useState({
    sport: "",
    details: "",
  });

  // Initialize form data when modal opens or profile data loads
  useEffect(() => {
    if (showAboutModal) {
      if (profileData) {
        setFormData({
          sport: profileData.sport || "",
          details: profileData.details || profileData.about || "",
        });
      } else if (user) {
        setFormData({
          sport: user.sport || "",
          details: user.details || user.about || "",
        });
      }
    }
  }, [profileData, user, showAboutModal]);

  // Refetch profile data when modal opens
  useEffect(() => {
    if (showAboutModal) {
      refetch();
    }
  }, [showAboutModal, refetch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.sport.trim()) {
      dispatch(
        addNotification({
          type: "error",
          message: "Please specify what sport you coach",
        })
      );
      return;
    }

    try {
      await updateProfile({
        sport_coach: formData.sport.trim(),
        details: formData.details.trim(),
      }).unwrap();

      // Update user in Redux store
      dispatch(
        setUser({
          ...user,
          sport_coach: formData.sport.trim(),
          details: formData.details.trim(),
        })
      );

      dispatch(
        addNotification({
          type: "success",
          message: "About information updated successfully!",
        })
      );

      localStorage.setItem("aboutModal", "showed");

      onClose();
    } catch (error) {
      console.error("About update failed:", error);
      dispatch(
        addNotification({
          type: "error",
          message: error.message || "Failed to update about information",
        })
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-auto bg-opacity-50 bg-white/30 backdrop-blur-xs">
      <div className="w-full max-w-lg mx-auto overflow-hidden bg-white shadow-2xl rounded-3xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">About</h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 text-white transition-all duration-200 bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 hover:shadow-xl"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-8">
          {isLoadingProfile ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-b-2 border-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block mb-4 text-lg font-medium text-gray-900">
                  What sport do you coach?
                </label>
                <input
                  type="text"
                  name="sport"
                  value={formData.sport}
                  onChange={handleInputChange}
                  placeholder="e.g., Football, Basketball, Tennis..."
                  className="w-full px-4 py-4 text-lg placeholder-gray-400 transition-all duration-200 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-4 text-lg font-medium text-gray-900">
                  Details
                </label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  placeholder="The more detail you provide here, the more personalized your responses will be later!"
                  rows={6}
                  className="w-full px-4 py-4 text-lg leading-relaxed placeholder-gray-400 transition-all duration-200 border-2 border-gray-200 resize-none rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Share your coaching experience, specialties, achievements, or
                  anything that helps us understand your background better.
                </p>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  isLoading={isUpdating}
                  className="w-full py-4 text-lg font-semibold text-white transition-all duration-200 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl hover:shadow-xl"
                >
                  {isUpdating ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutModal;
