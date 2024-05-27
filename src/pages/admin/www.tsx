import { useEffect, useState } from "react";
import { useGetLandingPageQuery, useEditImageMutation, useDeleteImageMutation } from "@/redux/apiSlices/adminApiSlice";

const AdminImages = () => {
  // Fetch landing page data on component mount
  const { data: landingPageData, isLoading: landingPageLoading, isError: landingPageError, refetch: refetchLandingPage } = useGetLandingPageQuery();

  // Edit image mutation
  const [editImage] = useEditImageMutation();
  
  // Delete image mutation
  const [deleteImage] = useDeleteImageMutation();

  useEffect(() => {
    refetchLandingPage(); // Fetch landing page data on component mount
  }, [refetchLandingPage]);

  const handleEditImage = async (imageType, imageUrl) => {
    // Handle editing image
    try {
      // Make API call to edit image
      await editImage({ imageType, imageUrl }).unwrap();
      // Refetch landing page data after editing
      refetchLandingPage();
    } catch (error) {
      console.error("Error editing image:", error);
    }
  };

  const handleDeleteImage = async (imageType) => {
    // Handle deleting image
    try {
      // Make API call to delete image
      await deleteImage({ imageType }).unwrap();
      // Refetch landing page data after deletion
      refetchLandingPage();
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  // Render your component UI with landing page data, edit and delete functionalities

  return (
    // Your component JSX
  );
};

export default AdminImages;
