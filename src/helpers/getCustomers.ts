import apiClient from "../config/apiConfig";

export const getCustomers = async (page: number, limit: number = 10) => {
  return await apiClient.get(
    `/api/admin/customers?page=${page}&limit=${limit}`,
  );
};
