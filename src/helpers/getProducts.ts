import apiClient from "../config/apiConfig";

export const getProducts = async (page: number, limit: number = 10) => {
  return await apiClient.get(`/api/products?page=${page}&limit=${limit}`);
};
