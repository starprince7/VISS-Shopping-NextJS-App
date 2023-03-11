import apiClient from "../config/apiConfig";

export const getOrders = async (page: number, limit: number = 0) => {
  return apiClient.get(`/api/admin/orders?page=${page}&limit=${limit}`);
};
