import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  port: process.env.PORT || 5000,
  mongodb_url: process.env.MONGODB_URL,
  scrict_key: process.env.SCRICT_KEY,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};


// console.log("url check", process.env.MONGODB_URL);
