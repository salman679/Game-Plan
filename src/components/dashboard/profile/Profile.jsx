import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { X, User, Camera, Mail } from "lucide-react";
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "../../../app/authApi";
import {
  addNotification,
  setShowProfileModal,
} from "../../../features/uiSlice";
import { setUser } from "../../../features/authSlice";
import Button from "../../ui/Button";

const ProfileModal = ({ isOpen, onClose }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();
  const {
    data: profileData,
    isLoading: isLoadingProfile,
    refetch,
  } = useGetUserProfileQuery(undefined);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    about: "",
  });

  // Initialize form data when modal opens or profile data loads
  useEffect(() => {
    if (profileData) {
      setFormData({
        name: profileData.userName || profileData.name || "",
        email: profileData.email || "",
        about: profileData.about || "Football Coach",
      });
    } else if (user) {
      setFormData({
        name: user.userName || user.name || "",
        email: user.email || "",
        about: user.about || "Football Coach",
      });
    }
  }, [profileData, user]);

  // Refetch profile data when modal opens
  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      dispatch(
        addNotification({
          type: "error",
          message: "Name is required",
        })
      );
      return;
    }

    try {
      await updateProfile({
        name: formData.name.trim(),
        about: formData.about.trim(),
      }).unwrap();

      // Update user in Redux store
      dispatch(
        setUser({
          ...user,
          userName: formData.name.trim(),
          name: formData.name.trim(),
          about: formData.about.trim(),
        })
      );

      dispatch(
        addNotification({
          type: "success",
          message: "Profile updated successfully!",
        })
      );

      dispatch(setShowProfileModal(false));
    } catch (error) {
      console.error("Profile update failed:", error);
      dispatch(
        addNotification({
          type: "error",
          message: error.message || "Failed to update profile",
        })
      );
    }
  };

  if (!isOpen) return null;

  const displayData = profileData || user || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-auto bg-opacity-50 bg-white/30 backdrop-blur-xs">
      <div className="w-full max-w-md mx-auto bg-white shadow-2xl rounded-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Personal Information
          </h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 text-white transition-colors bg-blue-500 rounded-full hover:bg-blue-600"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6">
          {isLoadingProfile ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-b-2 border-indigo-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center mb-6">
                <div className="relative">
                  <div className="flex items-center justify-center w-24 h-24 mb-3 overflow-hidden rounded-full bg-gradient-to-br from-indigo-400 to-purple-500">
                    {displayData.photoURL ? (
                      <img
                        src={displayData.photoURL}
                        alt="Profile"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <User className="w-12 h-12 text-white" />
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 flex items-center justify-center w-8 h-8 text-white transition-colors bg-gray-800 rounded-full hover:bg-gray-700">
                    <Camera size={14} />
                  </button>
                </div>
                <div className="text-center">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    {formData.name || "User"}
                  </h3>
                  <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
                    Standard Account
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                      size={16}
                    />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full py-3 pl-10 pr-4 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                      size={16}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      disabled
                      className="w-full py-3 pl-10 pr-4 text-gray-500 border border-gray-300 rounded-lg cursor-not-allowed bg-gray-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    About You
                  </label>
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tell us about yourself"
                  />
                </div>

                <Button
                  type="submit"
                  isLoading={isUpdating}
                  className="w-full py-3 font-medium text-white transition-all duration-200 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Edit Profile
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
