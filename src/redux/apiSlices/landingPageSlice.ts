import { apiSlice } from "../apiSlice";

// Inject additional endpoints into the existing adminApiSlice
export const landingPageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    getLandingPage: builder.query({
      query: () => ({
        url: `/landing-page`, 
        method: "GET",
      }),
    }),
    sendMessage: builder.mutation({
      query: data => ({
        url: `/contact`,
        method: "POST",
        body:{...data}
      }),
    }),
    
  }),
});

// Extract generated hooks for each endpoint
export const {useGetLandingPageQuery,useSendMessageMutation} = landingPageApi;
