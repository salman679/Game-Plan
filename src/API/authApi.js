import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://alibackend.duckdns.org';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      headers.set('content-type', 'application/json');
      headers.set('accept', 'application/json');
      
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      
      return headers;
    },
  }),
  tagTypes: ['Auth', 'User'],
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: '/authentication_app/signup/',
        method: 'POST',
        body: {
          email: credentials.email,
          password: credentials.password,
        },
      }),
      transformResponse: (response) => {
        return {
          success: true,
          message: 'Account created successfully. Please check your email for verification code.',
          ...response,
        };
      },
      transformErrorResponse: (response) => {
        return {
          status: response.status,
          message: response.data?.message || 'Signup failed. Please try again.',
        };
      },
    }),

    verifyOtp: builder.mutation({
      query: (data) => ({
        url: '/authentication_app/verify_otp/',
        method: 'POST',
        body: {
          email: data.email,
          otp: data.code,
        },
      }),
      transformResponse: (response) => {
        return {
          success: true,
          message: 'OTP verified successfully',
          ...response,
        };
      },
      transformErrorResponse: (response) => {
        return {
          status: response.status,
          message: response.data?.message || 'Invalid verification code',
        };
      },
    }),

    resendOtp: builder.mutation({
      query: (data) => ({
        url: '/authentication_app/resend_otp/',
        method: 'POST',
        body: {
          email: data.email,
        },
      }),
      transformResponse: (response) => {
        return {
          success: true,
          message: 'Verification code sent successfully',
          ...response,
        };
      },
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: '/authentication_app/signin/',
        method: 'POST',
        body: {
          email: credentials.email,
          password: credentials.password,
        },
      }),
      transformResponse: (response) => {
        return {
          success: true,
          message: 'Login successful',
          token: response.access_token || response.token,
          user: {
            id: response.user?.id || response.id,
            email: credentials.email,
            userName: response.user?.name || response.name || 'User',
            subscriptionStatus: response.user?.subscription_status || response.subscription_status,
          },
          ...response,
        };
      },
      transformErrorResponse: (response) => {
        return {
          status: response.status,
          message: response.data?.message || 'Invalid email or password',
        };
      },
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: '/authentication_app/reset_password/',
        method: 'POST',
        body: {
          email: data.email,
        },
      }),
      transformResponse: (response) => {
        return {
          success: true,
          message: 'Password reset instructions sent to your email',
          ...response,
        };
      },
      transformErrorResponse: (response) => {
        return {
          status: response.status,
          message: response.data?.message || 'Failed to send reset instructions',
        };
      },
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: '/authentication_app/reset_password/',
        method: 'POST',
        body: {
          email: data.email,
          new_password: data.newPassword,
          confirm_password: data.confirmPassword,
        },
      }),
      transformResponse: (response) => {
        return {
          success: true,
          message: 'Password reset successfully',
          ...response,
        };
      },
      transformErrorResponse: (response) => {
        return {
          status: response.status,
          message: response.data?.message || 'Failed to reset password',
        };
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/authentication_app/logout/',
        method: 'POST',
      }),
      transformResponse: (response) => {
        return {
          success: true,
          message: 'Logged out successfully',
          ...response,
        };
      },
    }),

    getUserProfile: builder.query({
      query: () => ({
        url: '/authentication_app/user_profile/',
        method: 'GET',
      }),
      providesTags: ['User'],
      transformResponse: (response) => {
        return {
          id: response.id,
          email: response.email,
          userName: response.name || 'User',
          subscriptionStatus: response.subscription_status,
          ...response,
        };
      },
    }),

    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: '/authentication_app/user_profile/',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['User'],
      transformResponse: (response) => {
        return {
          success: true,
          message: 'Profile updated successfully',
          ...response,
        };
      },
    }),

    getUserLog: builder.query({
      query: () => ({
        url: '/authentication_app/settings/user_log/',
        method: 'GET',
      }),
      transformResponse: (response) => {
        return {
          logs: response.logs || response,
          ...response,
        };
      },
    }),
  }),
});

export const {
  useSignupMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useGetUserLogQuery,
} = authApi;