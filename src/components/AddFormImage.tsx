import React, { useState } from 'react';
//import { useAddImageMutation } from '@/redux/apiSlices/adminApiSlice';
import axios from 'axios';

const AddImageForm: React.FC = () => {
  const [imageType, setImageType] = useState<string>('hero');
  const [imageFile, setImageFile] = useState<File | null>(null); // State to store the selected file
  //const [addImage] = useAddImageMutation();

  const handleImageTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setImageType(event.target.value);
  };

  const handleImageFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the first selected file
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!imageFile) {
      console.error('No file selected');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('imageType', imageType);
      formData.append('imageFile', imageFile);

      console.log('formData',formData)
      console.log('img file',imageFile)
      // Send the formData to the backend using the addImage mutation
      //const response = await addImage(formData);
      const response=await axios.post('http://localhost:3000/api/admin/add-image',imageType)

      console.log('Response:', response);

      // Reset form fields
      setImageType('hero');
      setImageFile(null);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="imageType">Image Type:</label>
        <select id="imageType" value={imageType} onChange={handleImageTypeChange}>
          <option value="hero">Hero Image</option>
          <option value="about">About Image</option>
          <option value="corePackage">Core Package Image</option>
        </select>
      </div>
      <div>
        <label htmlFor="imageFile">Choose Image File:</label>
        <input
          type="file"
          id="imageFile"
          onChange={handleImageFileChange}
          accept="image/*" // Accept only image files
        />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default AddImageForm;
