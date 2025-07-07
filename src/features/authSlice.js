import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: localStorage.getItem("authToken") || null,
  isAuthenticated: !!localStorage.getItem("authToken"),
  currentStep: "signup",
  email: "",
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      if (action.payload) {
        localStorage.setItem("authToken", action.payload);
      } else {
        localStorage.removeItem("authToken");
      }
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.currentStep = "login";
      localStorage.removeItem("authToken");
    },
    reset: (state) => {
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const {
  setCurrentStep,
  setEmail,
  setUser,
  setToken,
  setLoading,
  setError,
  logout,
  reset,
} = authSlice.actions;

export default authSlice.reducer;
