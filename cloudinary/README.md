# Cloudinary Image Upload with Axios

This guide explains how to use **Cloudinary** for uploading images and fetching the uploaded data using **Axios**.

---

## Prerequisites

1. A [Cloudinary account](https://cloudinary.com/) (free or paid).
2. Install the required dependencies:
   ```bash
   npm install axios
   ```
3. Your Cloudinary credentials:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

---

## Steps to Set Up Cloudinary Integration

### 1. Configure Cloudinary

- Go to your [Cloudinary Dashboard](https://cloudinary.com/console).
- Navigate to **Settings > Upload > Upload Presets**.
  - Create an **unsigned upload preset**.
  - Note the **Upload Preset Name**.

---

### 2. Frontend Code for Image Upload

Create a React component for uploading images to Cloudinary:

#### File: `ImageUploader.js`

```javascript
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
      <input type="file" onChange={handleImageChange} />
      {preview && <img src={preview} alt="Preview" style={{ width: "200px" }} />}
      <button onClick={handleUpload}>Upload to Cloudinary</button>
    </div>
  );
};

export default ImageUploader;
```

---

### 3. Fetch Uploaded Images

You can fetch the uploaded images using Cloudinary's API.

#### Backend Example (Node.js)

Install the Cloudinary SDK:
```bash
npm install cloudinary
```

Then fetch resources:

#### File: `fetchImages.js`

```javascript
import axios from "axios";

// Cloudinary credentials
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/your_cloud_name/resources/image";
const API_KEY = "your_api_key";
const API_SECRET = "your_api_secret";

// Fetch uploaded images
const fetchUploadedImages = async () => {
  try {
    const response = await axios.get(CLOUDINARY_URL, {
      auth: {
        username: API_KEY,
        password: API_SECRET,
      },
    });

    console.log("Uploaded Images:", response.data.resources);
    return response.data.resources;
  } catch (error) {
    console.error("Error fetching uploaded images:", error);
  }
};

fetchUploadedImages();
```

---

### 4. Organizing Images in Folders

To organize your images into folders, add a `folder` field when uploading:

```javascript
formData.append("folder", "my_folder_name");
```

This will store your image inside the specified folder in your Cloudinary account.

---

### 5. Notes on Security

- Avoid exposing **API Key** and **API Secret** in frontend code.
- Use a backend API for secure interactions with Cloudinary’s APIs when needed.

---

## Example Workflow

1. **Frontend:** Upload image using Axios directly to Cloudinary.
2. **Backend (Optional):** Fetch and manage images securely.
3. Display the image using the URL returned from Cloudinary (`response.data.secure_url`).

---

## References

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Axios Documentation](https://axios-http.com/docs/intro)
