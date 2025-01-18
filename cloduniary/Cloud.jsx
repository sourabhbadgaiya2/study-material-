import React, { useState } from "react";
import axios from "axios";
import Images from "./Images";

const Cloud = () => {
  // State to hold the selected image file
  const [image, setImage] = useState(null);

  // Function to handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first file selected by the user
    setImage(file); // Save the file to state
  };

  // Function to handle image upload to Cloudinary
  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first!"); // Alert user if no image is selected
      return;
    }

    // Create a form data object to send the file and related details
    const formData = new FormData();
    formData.append("file", image); // Attach the image file
    formData.append("upload_preset", "uploadfirst"); // Replace with your Cloudinary upload preset
    formData.append("cloud_name", "derla9pxq"); // Replace with your Cloudinary cloud name

    try {
      // Make a POST request to Cloudinary's image upload endpoint
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/derla9pxq/image/upload",
        formData
      );
   
      alert("Image uploaded successfully!"); // Notify user of successful upload
    } catch (error) {
      console.error("Error uploading image:", error); // Log any errors that occur
      alert("Failed to upload image."); // Notify user of upload failure
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6'>
      {/* Card container for the upload UI */}
      <div className='w-full max-w-md bg-white rounded-lg shadow-md p-6'>
        {/* Heading */}
        <h1 className='text-2xl font-semibold text-center mb-6 text-gray-800'>
          Image Upload
        </h1>

        {/* File input for image selection */}
        <input
          type='file'
          accept='image/*' // Restrict file selection to image types only
          onChange={handleImageChange} // Handle file selection
          className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
        />

        {/* Upload button */}
        <button
          onClick={handleUpload} // Trigger upload on click
          className='mt-4 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        >
          Upload to Cloudinary
        </button>
      </div>
      <hr />
      <Images />
    </div>
  );
};

export default Cloud;
