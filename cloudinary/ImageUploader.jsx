import React, { useState } from "react";
import axios from "axios";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file)); // Show a preview of the image
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "your_upload_preset"); // Replace with your Cloudinary upload preset
    formData.append("cloud_name", "your_cloud_name"); // Replace with your Cloudinary cloud name

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        formData
      );

      console.log("Uploaded Image Data:", response.data);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    }
  };

  return (
    <div>
      <h1>Image Upload</h1>
      <input type='file' onChange={handleImageChange} />
      {preview && (
        <img src={preview} alt='Preview' style={{ width: "200px" }} />
      )}
      <button onClick={handleUpload}>Upload to Cloudinary</button>
    </div>
  );
};

export default ImageUploader;
