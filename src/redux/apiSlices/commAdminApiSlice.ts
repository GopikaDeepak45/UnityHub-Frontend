import { apiSlice } from "../apiSlice";



const COMM_ADMIN_URL = "/commAdmin";

// Inject additional endpoints into the existing adminApiSlice
export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    // Define a mutation endpoint for adding a user
    register: builder.mutation({
      query: data => ({
        url: `${COMM_ADMIN_URL}/register`,
        method: "POST",
        body:{...data}
      }),
    }),
    verifyOTP: builder.mutation({
      query: data => ({
        url: `${COMM_ADMIN_URL}/otp`,
        method: "POST",
        body:{...data}
      }),
    }),
  }),
});

// Extract generated hooks for each endpoint
export const {useRegisterMutation,useVerifyOTPMutation} = adminApi;