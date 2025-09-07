import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, // 🔹 case corrected
    api_secret: process.env.CLOUDINARY_API_SECRET, // 🔹 removed semicolon
  });
};

export default connectCloudinary;
