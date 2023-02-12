import apiClient from "../config/apiConfig";

export const getProducts = async () => {
  return apiClient.get("/api/products/");
};
