import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import uiReducer from "../features/uiSlice";
import chatReducer from "../features/chatSlice";
import calendarReducer from "../features/calenderSlice";
import { authApi } from "../app/authApi";
import { profileApi } from "../app/profileApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    chat: chatReducer,
    calendar: calendarReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(authApi.middleware, profileApi.middleware),
});
