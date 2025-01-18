const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");

app.use(cors());

const CLOUD_NAME = "derla9pxq";
const API_KEY = "594463212292779";
const API_SECRET = "c8xFovD_i56hpuqfWOMcbM3y_io";

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
