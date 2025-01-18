import axios from "axios";

// Cloudinary credentials
const CLOUDINARY_URL =
  "https://api.cloudinary.com/v1_1/your_cloud_name/resources/image";
const API_KEY = "your_api_key";
const API_SECRET = "your_api_secret";

// Fetch uploaded imagesa ji
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
