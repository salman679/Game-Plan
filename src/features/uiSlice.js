import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Modal states
  showProfileModal: false,
  showFAQ: false,
  showUserMenu: false,
  showTermsModal: false,
  showSupportModal: false,
  showSettingsModal: false,

  // Active view
  activeView: "dashboard", // dashboard, chat, calendar

  // Chat state
  selectedChatId: null,

  // Calendar state
  currentDate: new Date().toISOString(),
  selectedDate: null,

  // Loading states
  isLoading: false,

  // Error states
  error: null,

  // Notifications
  notifications: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // Modal actions
    setShowProfileModal: (state, action) => {
      state.showProfileModal = action.payload;
    },
    setShowFAQ: (state, action) => {
      state.showFAQ = action.payload;
    },
    setShowUserMenu: (state, action) => {
      state.showUserMenu = action.payload;
    },
    setShowTermsModal: (state, action) => {
      state.showTermsModal = action.payload;
    },
    setShowSupportModal: (state, action) => {
      state.showSupportModal = action.payload;
    },
    setShowSettingsModal: (state, action) => {
      state.showSettingsModal = action.payload;
    },

    // View actions
    setActiveView: (state, action) => {
      state.activeView = action.payload;
    },

    // Chat actions
    setSelectedChatId: (state, action) => {
      state.selectedChatId = action.payload;
    },

    // Calendar actions
    setCurrentDate: (state, action) => {
      state.currentDate = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },

    // Loading actions
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    // Error actions
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },

    // Notification actions
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  setShowProfileModal,
  setShowFAQ,
  setShowUserMenu,
  setShowTermsModal,
  setShowSupportModal,
  setShowSettingsModal,
  setActiveView,
  setSelectedChatId,
  setCurrentDate,
  setSelectedDate,
  setLoading,
  setError,
  clearError,
  addNotification,
  removeNotification,
  clearNotifications,
} = uiSlice.actions;

export default uiSlice.reducer;
