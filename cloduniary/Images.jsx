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
