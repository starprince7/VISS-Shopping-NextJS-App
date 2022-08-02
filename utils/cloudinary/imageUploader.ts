import cloudinary from "./cloudinary";
import { UploadApiResponse } from "cloudinary";

// Image Uploader
async function uploadImage(image: string): Promise<UploadApiResponse> {
  console.log("Uploading file to cloudinary...");
  return await cloudinary.uploader.upload(image, {
    folder: "viss_shopping_product_images",
  });
}

export default uploadImage;
