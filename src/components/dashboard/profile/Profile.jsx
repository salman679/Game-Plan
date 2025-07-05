import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { X, User, Camera } from "lucide-react";
import { useUpdateUserProfileMutation } from "../../../app/authApi";
import { setUser } from "../../../features/authSlice";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

const ProfileModal = ({ isOpen, onClose }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [updateProfile, { isLoading }] = useUpdateUserProfileMutation();

  const [formData, setFormData] = useState({
    name: user?.userName || "",
    email: user?.email || "",
    about: user?.about || "Football Coach",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({
        name: formData.name,
        about: formData.about,
      }).unwrap();

      dispatch(
        setUser({
          ...user,
          userName: formData.name,
          about: formData.about,
        })
      );

      onClose();
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-50 bg-white/30 backdrop-blur-xs">
      <div className="w-full max-w-md mx-auto bg-white shadow-2xl rounded-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Personal Information
          </h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 text-blue-600 transition-colors bg-blue-100 rounded-full hover:bg-blue-200"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <div className="flex items-center justify-center w-24 h-24 mb-3 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500">
                <User className="w-12 h-12 text-white" />
              </div>
              <button className="absolute bottom-0 right-0 flex items-center justify-center w-8 h-8 text-white transition-colors bg-gray-800 rounded-full hover:bg-gray-700">
                <Camera size={14} />
              </button>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900">{formData.name}</h3>
              <span className="inline-flex items-center px-3 py-1 mt-2 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
                Standard Account
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              icon={<User size={16} />}
            />

            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              disabled
              className="bg-gray-50"
              icon={<User size={16} />}
            />

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                About You
              </label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Tell us about yourself"
              />
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              Edit Profile
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
