import { apiSlice } from "../apiSlice";



const ADMIN_URL = "/admin";

// Inject additional endpoints into the existing adminApiSlice
export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
     addImage: builder.mutation({
      query: data => ({
        url: `${ADMIN_URL}/images/addImage`,
        method: "POST",
        body:{...data}
      }),
    }),
    deleteImage: builder.mutation({
      query: data => ({
        url: `${ADMIN_URL}/images/deleteImage`,
        method: "POST",
        body:{...data}
      }),
    }),
    addCorePackage: builder.mutation({
      query: data => ({
        url: `${ADMIN_URL}/packages/addPackage`,
        method: "POST",
        body:{...data}
      }),
    }),
    fetchCommunityData: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/community`,
        method: "GET",
      }),
    }),
  }),
});

// Extract generated hooks for each endpoint
export const {useAddImageMutation,useFetchCommunityDataQuery,useDeleteImageMutation,useAddCorePackageMutation} = adminApi;
