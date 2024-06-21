import { UploadApiResponse } from "cloudinary";

import cloudinary from "../../config/cloudinary";

// Image Uploader
async function uploadImage(
  image: string,
  productNumber: string,
): Promise<UploadApiResponse> {
  console.log("Uploading file to cloudinary...");
  return cloudinary.uploader.upload(image, {
    folder: "viss_shopping_product_images",
    public_id: productNumber,
  });
}

/**
 * This function deletes a single image file stored in cloud.
 * @params {string} productNumber - Pass in a productNumber or a public_id.
 * @returns - Await the async response of the remove action.
 */
async function removeUploadedImage(
  productNumber: string,
): Promise<UploadApiResponse> {
  console.log(
    "Deleting file from cloudinary with product ID... : ",
    `viss_shopping_product_images/${productNumber}`,
  );
  return cloudinary.uploader.destroy(
    `viss_shopping_product_images/${productNumber}`,
    {
      resource_type: "image",
      invalidate: true,
    },
  );
}

const ImageService = { uploadImage, removeUploadedImage };

export default ImageService;
