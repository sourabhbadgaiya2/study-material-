# Image Uploader

This project demonstrates an image uploading and retrieval system using a Node.js backend and React frontend. The backend interacts with Cloudinary's API to fetch uploaded images, and the frontend displays these images in a responsive grid layout.

---

## Features

- **Backend**: Implements an Express API to fetch images stored in Cloudinary.
- **Frontend**: Displays uploaded images in a responsive grid using React.
- **Styling**: Utilizes Tailwind CSS for a clean and responsive layout.

---

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- Cloudinary account (with `CLOUD_NAME`, `API_KEY`, and `API_SECRET`)

---

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies for both the backend and frontend:
   ```bash
   npm install
   ```

#### Component: ImageUploader

```javascript
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

export default ImageUploader;
```

---

---

## Backend Setup

1. Navigate to the `backend` folder:

   ```bash
   cd backend
   ```

2. Create a `.env` file and configure your Cloudinary credentials:

   ```env
   CLOUD_NAME=your-cloudinary-cloud-name
   API_KEY=your-cloudinary-api-key
   API_SECRET=your-cloudinary-api-secret
   ```

3. Start the server:

   ```bash
   node index.js
   ```

   The server will run on `http://localhost:5000`.

---

### Backend Code

```javascript
const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");

app.use(cors());

const CLOUD_NAME = process.env.CLOUD_NAME;
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

app.get("/images", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image`,
      {
        auth: {
          username: API_KEY,
          password: API_SECRET,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
```

---

## Frontend Setup

1. Navigate to the `frontend` folder:

   ```bash
   cd frontend
   ```

2. Start the development server:

   ```bash
   npm start
   ```

   The React application will run on `http://localhost:3000`.

---

### Frontend Code

#### Component: Images

```javascript
import axios from "axios";
import React, { useState, useEffect } from "react";

const Images = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/images");
        setImages(response.data.resources); // resources contain uploaded image data
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6'>
      {images.map((image) => (
        <div key={image.public_id} className='rounded-lg shadow-lg'>
          <img
            src={image.secure_url}
            alt={image.public_id}
            className='rounded-lg'
          />
        </div>
      ))}
    </div>
  );
};

export default Images;
```

## Run the Project

1. Start the backend server:

   ```bash
   cd backend
   node index.js
   ```

2. Start the frontend server:

   ```bash
   cd frontend
   npm start
   ```

3. Visit `http://localhost:3000` in your browser to see the image uploader in action.

---

## License

This project is licensed under the MIT License. Feel free to use and modify it as needed.

---

## Acknowledgments

- [Cloudinary API Documentation](https://cloudinary.com/documentation)
- [Express.js](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
