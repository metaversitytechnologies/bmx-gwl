import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { dynamicBaseQuery } from "./dynamicBaseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: dynamicBaseQuery,
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: "/bmx/login/auth-app-url-wise-v2",
        method: "POST",
        body,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: "/login/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
