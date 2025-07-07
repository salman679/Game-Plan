import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseUrl = "https://authenti-cation-system.vercel.app";
const baseUrl = "http://192.168.10.129:9000";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      headers.set("content-type", "application/json");
      headers.set("accept", "application/json");

      if (token) {
        headers.set("authorization", `JWT ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Auth", "User", "Chat", "Message", "Event", "Plan", "Support"],
  endpoints: (builder) => ({
    // Authentication endpoints
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/api/signup/",
        method: "POST",
        body: {
          username: credentials.username,
          email: credentials.email,
          password: credentials.password,
        },
      }),
      transformResponse: (response) => ({
        success: true,
        message:
          "Account created successfully. Please check your email for verification code.",
        ...response,
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        message:
          response.data?.message ||
          response.data?.detail ||
          "Signup failed. Please try again.",
      }),
    }),

    sendOtp: builder.mutation({
      query: (data) => ({
        url: "/api/send-otp/",
        method: "POST",
        body: {
          email: data.email,
        },
      }),
    }),

    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/api/verify-otp/",
        method: "POST",
        body: {
          email: data.email,
          otp: data.otp,
        },
      }),

      transformResponse: (response) => ({
        success: true,
        message: "OTP verified successfully",
        ...response,
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        message:
          response.data?.message ||
          response.data?.detail ||
          "Invalid verification code",
      }),
    }),

    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/api/send-otp/",
        method: "POST",
        body: {
          email: data.email,
        },
      }),
      transformResponse: (response) => ({
        success: true,
        message: "Verification code sent successfully",
        ...response,
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        message:
          response.data?.message ||
          response.data?.detail ||
          "Failed to resend verification code",
      }),
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/login/",
        method: "POST",
        body: {
          email: credentials.email,
          password: credentials.password,
        },
      }),
      transformResponse: (response) => ({
        success: true,
        message: "Login successful",
        token: response.access_token || response.token || response.access,
        user: {
          id: response.user?.id || response.id,
          // email: credentials.email,
          userName:
            response.user?.name ||
            response.name ||
            response.user?.username ||
            "User",
          subscriptionStatus:
            response.user?.subscription_status ||
            response.subscription_status ||
            "free",
        },
        ...response,
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        message:
          response.data?.message ||
          response.data?.detail ||
          response.data?.non_field_errors?.[0] ||
          "Invalid email or password",
      }),
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/api/users/reset_password/",
        method: "POST",
        body: {
          email: data.email,
        },
      }),
      transformResponse: (response) => ({
        success: true,
        message: "Password reset instructions sent to your email",
        ...response,
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        message:
          response.data?.message ||
          response.data?.detail ||
          "Failed to send reset instructions",
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/api/reset_password/",
        method: "POST",
        body: {
          email: data.email,
          new_password: data.newPassword,
          confirm_password: data.confirmPassword,
        },
      }),
      transformResponse: (response) => ({
        success: true,
        message: "Password reset successfully",
        ...response,
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        message:
          response.data?.message ||
          response.data?.detail ||
          "Failed to reset password",
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/api/logout/",
        method: "POST",
      }),
      invalidatesTags: ["Auth", "User", "Chat", "Message", "Event", "Plan"],
      transformResponse: (response) => ({
        success: true,
        message: "Logged out successfully",
        ...response,
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        message:
          response.data?.message || response.data?.detail || "Logout failed",
      }),
    }),

    getUserProfile: builder.query({
      query: () => ({
        url: "/api/profile/",
        method: "GET",
      }),
      providesTags: ["User"],
      transformResponse: (response) => ({
        id: response.id,
        email: response.email,
        userName: response.username || response.username || "User",
        fast_name: response.fast_name,
        last_name: response.last_name,
        profile_picture: response.profile_picture,
        subscriptionStatus: response.subscription_status || "free",
        about: response.about || "Football Coach",
        ...response,
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        message:
          response.data?.message ||
          response.data?.detail ||
          "Failed to fetch user profile",
      }),
    }),

    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: "/api/profile/",
        method: "PATCH",
        body: data,
      }),
      providesTags: ["User"],
      transformResponse: (response) => ({
        success: true,
        message: "Logged out successfully",
        ...response,
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        message:
          response.data?.message ||
          response.data?.detail ||
          "Failed to fetch user profile",
      }),
    }),

    createUserAbout: builder.mutation({
      query: (data) => ({
        url: "/api/about/create/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
      transformResponse: (response) => ({
        success: true,
        message: "Profile updated successfully",
        ...response,
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        message:
          response.data?.message ||
          response.data?.detail ||
          "Failed to update profile",
      }),
    }),

    updateUserAbout: builder.mutation({
      query: (data) => ({
        url: "/api/about/",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
      transformResponse: (response) => ({
        success: true,
        message: "Profile updated successfully",
        ...response,
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        message:
          response.data?.message ||
          response.data?.detail ||
          "Failed to update profile",
      }),
    }),

    getUserAbout: builder.query({
      query: (data) => ({
        url: "/api/about/",
        method: "GET",
        body: data,
      }),
      invalidatesTags: ["User"],
      transformResponse: (response) => ({
        success: true,
        message: "Profile updated successfully",
        ...response,
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        message:
          response.data?.message ||
          response.data?.detail ||
          "Failed to update profile",
      }),
    }),

    getUserLog: builder.query({
      query: () => ({
        url: "/api/settings/user_log/",
        method: "GET",
      }),
      transformResponse: (response) => ({
        logs: response.logs || response,
        ...response,
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        message:
          response.data?.message ||
          response.data?.detail ||
          "Failed to fetch user logs",
      }),
    }),

    // Firebase authentication endpoint
    firebaseAuth: builder.mutation({
      query: (data) => ({
        url: "/api/firebase_auth/",
        method: "POST",
        body: {
          firebase_token: data.firebase_token,
          provider: data.provider,
          user_data: data.user_data,
        },
      }),
      transformResponse: (response) => ({
        success: true,
        message: "Firebase authentication successful",
        token: response.access_token || response.token || response.access,
        user: {
          id: response.user?.id || response.id,
          email: response.user?.email || response.email,
          userName:
            response.user?.name ||
            response.name ||
            response.user?.username ||
            "User",
          subscriptionStatus:
            response.user?.subscription_status ||
            response.subscription_status ||
            "free",
          // provider: data.provider,
        },
        ...response,
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        message:
          response.data?.message ||
          response.data?.detail ||
          "Firebase authentication failed",
      }),
    }),

    // Support endpoints
    sendSupportRequest: builder.mutation({
      query: (data) => ({
        url: "/terms_and_support/support/",
        method: "POST",
        body: {
          email: data.email,
          query: data.query,
        },
      }),
      invalidatesTags: ["Support"],
      transformResponse: (response) => ({
        success: true,
        message: "Support request sent successfully",
        ...response,
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        message:
          response.data?.message ||
          response.data?.detail ||
          "Failed to send support request",
      }),
    }),

    getTerms: builder.query({
      query: () => ({
        url: "/terms_and_support/terms/",
        method: "GET",
      }),
      providesTags: ["Support"],
      transformResponse: (response) => ({
        terms: response.terms || response,
        ...response,
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        message:
          response.data?.message ||
          response.data?.detail ||
          "Failed to fetch terms",
      }),
    }),

    // Company user management endpoints
    addUser: builder.mutation({
      query: (data) => ({
        url: "/company_user_management/add_user/",
        method: "POST",
        body: {
          email: data.email,
        },
      }),
      invalidatesTags: ["User"],
      transformResponse: (response) => ({
        success: true,
        message: "User added successfully",
        ...response,
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        message:
          response.data?.message ||
          response.data?.detail ||
          "Failed to add user",
      }),
    }),

    getUserList: builder.query({
      query: () => ({
        url: "/company_user_management/user_list/",
        method: "GET",
      }),
      providesTags: ["User"],
      transformResponse: (response) => ({
        users: response.users || response,
        ...response,
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        message:
          response.data?.message ||
          response.data?.detail ||
          "Failed to fetch user list",
      }),
    }),

    // Subscription endpoints
    buySubscription: builder.mutation({
      query: (data) => ({
        url: "/subscription/buy_subscription/",
        method: "POST",
        body: {
          subscription_plan: data.subscription_plan,
        },
      }),
      invalidatesTags: ["User"],
      transformResponse: (response) => ({
        success: true,
        message: "Subscription purchased successfully",
        ...response,
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        message:
          response.data?.message ||
          response.data?.detail ||
          "Failed to purchase subscription",
      }),
    }),

    updateSubscription: builder.mutation({
      query: (data) => ({
        url: "/subscription/update_subscription/",
        method: "POST",
        body: {
          quantity: data.quantity,
        },
      }),
      invalidatesTags: ["User"],
      transformResponse: (response) => ({
        success: true,
        message: "Subscription updated successfully",
        ...response,
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        message:
          response.data?.message ||
          response.data?.detail ||
          "Failed to update subscription",
      }),
    }),

    // Chat endpoints
    createChat: builder.mutation({
      query: (message) => ({
        url: "/api/chat-history/",
        method: "POST",
        body: message,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Chat"],
      transformResponse: (response) => ({
        success: true,
        message: "Chat created successfully",
        chat: response,
        ...response,
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        message:
          response.data?.message ||
          response.data?.detail ||
          "Failed to create chat",
      }),
    }),

    addMessageToChat: builder.mutation({
      query: (message) => ({
        url: "/chat/add_message_to_chat/",
        method: "POST",
        body: message,
        headers: {
          "Content-Type": "text/plain",
        },
      }),
      invalidatesTags: ["Message"],
      transformResponse: (response) => ({
        success: true,
        message: "Message added successfully",
        ...response,
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        message:
          response.data?.message ||
          response.data?.detail ||
          "Failed to add message",
      }),
    }),

    getUserChatList: builder.query({
      query: () => ({
        url: "/chat/get_users_chat_list/",
        method: "GET",
      }),
      providesTags: ["Chat"],
      transformResponse: (response) => ({
        chats: response.chats || response,
        ...response,
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        message:
          response.data?.message ||
          response.data?.detail ||
          "Failed to fetch chat list",
      }),
    }),

    getSingleChat: builder.query({
      query: (chatId) => ({
        url: `/chat/get_a_single_chat/${chatId}/`,
        method: "GET",
      }),
      providesTags: (result, error, chatId) => [
        { type: "Message", id: chatId },
      ],
      transformResponse: (response) => ({
        chat: response.chat || response,
        messages: response.messages || [],
        ...response,
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        message:
          response.data?.message ||
          response.data?.detail ||
          "Failed to fetch chat",
      }),
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
  useGetUserLogQuery,
  useFirebaseAuthMutation,
  useSendSupportRequestMutation,
  useGetTermsQuery,
  useAddUserMutation,
  useGetUserListQuery,
  useBuySubscriptionMutation,
  useUpdateSubscriptionMutation,
  useCreateChatMutation,
  useAddMessageToChatMutation,
  useGetUserChatListQuery,
  useGetSingleChatQuery,
  useCreateUserAboutMutation,
  useGetUserAboutQuery,
  useUpdateUserProfileMutation,
  useUpdateUserAboutMutation,
} = authApi;
