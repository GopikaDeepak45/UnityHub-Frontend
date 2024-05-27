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
    
  }),
});

// Extract generated hooks for each endpoint
export const {useGetLandingPageQuery} = landingPageApi;
