import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const userlistApi = createApi({
  reducerPath: "userlistApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    userList: build.mutation({
      query: (body) => ({
        url: "/user/child-list-active-user",
        method: "POST",
        body,
      }),
    }),
    odsPnl: build.query({
      query: (body) => ({
        url: "/bets/odds-pnl",
        method: "POST",
        body,
      }),
    }),
    deposit: build.mutation({
      query: (body) => ({
        url: "/bmx/user/deposit-chips-pnl-v2",
        method: "POST",
        body,
      }),
    }),

    withdraw: build.mutation({
      query: (body) => ({
        url: "/bmx/user/withdraw-chips-pnl-v2",
        method: "POST",
        body,
      }),
    }),

    depositAndWithdraw: build.query({
      query: (body) => ({
        url: "/bmx/user/depositwithdrawdata-v2",
        method: "POST",
        body,
      }),
    }),
    addLimit: build.mutation({
      query: (body) => ({
        url: "/bmx/user/dcr-v2",
        method: "POST",
        body,
      }),
    }),
    minusLimit: build.mutation({
      query: (body) => ({
        url: "/bmx/user/wcr-v2",
        method: "POST",
        body,
      }),
    }),
    partnership: build.mutation({
      query: (body) => ({
        url: "/bmx/report/partnership-by-userid",
        method: "POST",
        body,
      }),
    }),
    createUserData: build.query({
      query: (body) => ({
        url: "/bmx/user/get-user-data-for-create-user",
        method: "POST",
        body,
      }),
    }),
    createUser: build.mutation({
      query: (body) => ({
        url: "/bmx/user/create/v2",
        method: "POST",
        body,
      }),
    }),
    updateUser: build.mutation({
      query: (body) => ({
        url: "/bmx/user/update-v2",
        method: "POST",
        body,
      }),
    }),
    getUser: build.query({
      query: (body) => ({
        url: "/bmx/user/get-user-for-update",
        method: "POST",
        body,
      }),
    }),
    accountOpration: build.query({
      query: (body) => ({
        url: "/bmx/report/action-logs",
        method: "POST",
        body,
      }),
    }),
    // upDateStatus: build.mutation({
    //   query: (body) => ({
    //     url: "/bmx/user/update-status",
    //     method: "POST",
    //     body,
    //   }),
    // }),
    isUserId: build.query({
      query: (body) => ({
        url: "/user/is-userid-available",
        method: "POST",
        body,
      }),
    }),
    upDateLimites: build.query({
      query: (body) => ({
        url: "/bmx/user/creditdata-v2",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useUserListQuery,
  useOdsPnlQuery,
  useDepositMutation,
  useWithdrawMutation,
  useDepositAndWithdrawQuery,
  useAddLimitMutation,
  useMinusLimitMutation,
  usePartnershipMutation,
  useLazyCreateUserDataQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useLazyGetUserQuery,
  useAccountOprationQuery,
  // useUpDateStatusMutation,
  useLazyIsUserIdQuery,
  useLazyUpDateLimitesQuery

} = userlistApi;
