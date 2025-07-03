import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../app/store';
import authReducer from '../features/authSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});