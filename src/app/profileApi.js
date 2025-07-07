import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://192.168.10.129:9000";

export const profileApi = createApi({
  reducerPath: "profileApi",
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
  endpoints: (builder) => ({
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
  }),
});

export const {
  useGetUserAboutQuery,
  useCreateUserAboutMutation,
  useGetUserProfileQuery,
  useUpdateUserAboutMutation,
  useUpdateUserProfileMutation,
} = profileApi;
