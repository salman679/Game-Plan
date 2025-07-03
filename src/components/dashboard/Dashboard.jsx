import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { User, LogOut, Settings, Shield, Activity } from 'lucide-react';
import { useGetUserProfileQuery, useLogoutMutation } from '../../app/store';
import { logout, setUser } from '../../features/authSlice';

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const [logoutMutation] = useLogoutMutation();
  const { data: profileData, isLoading: profileLoading } = useGetUserProfileQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (profileData && !profileLoading) {
      dispatch(setUser(profileData));
    }
  }, [profileData, profileLoading, dispatch]);

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      dispatch(logout());
    }
  };

  const displayUser = profileData || user;

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-gray-600">Welcome back, {displayUser?.userName}!</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut size={16} />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full">
                <User className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Profile Information</h3>
                <p className="text-sm text-gray-600">Your account details</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">{displayUser?.userName || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{displayUser?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">User ID</p>
                <p className="text-xs font-medium">{displayUser?.id}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Subscription Status</h3>
                <p className="text-sm text-gray-600">Current plan details</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                  displayUser?.subscriptionStatus === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {displayUser?.subscriptionStatus || 'Free'}
                </span>
              </div>
              <Button variant="outline" className="justify-start w-full text-left">
                Manage Subscription
              </Button>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Quick Actions</h3>
                <p className="text-sm text-gray-600">Manage your account</p>
              </div>
            </div>
            <div className="space-y-3">
              <Button variant="outline" className="justify-start w-full text-left">
                <Settings className="w-4 h-4 mr-2" />
                Account Settings
              </Button>
              <Button variant="outline" className="justify-start w-full text-left">
                <Shield className="w-4 h-4 mr-2" />
                Security Settings
              </Button>
              <Button variant="outline" className="justify-start w-full text-left">
                <Activity className="w-4 h-4 mr-2" />
                Activity Log
              </Button>
            </div>
          </Card>
        </div>

        {profileLoading && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center px-4 py-2 text-sm font-semibold leading-6 text-indigo-500 bg-white rounded-md shadow">
              <svg className="w-5 h-5 mr-3 -ml-1 text-indigo-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading profile...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;