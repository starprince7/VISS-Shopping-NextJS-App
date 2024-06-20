import apiClient from "../config/apiConfig";

type Params = {
  page: number;
  limit?: number;
  status?: string;
};

export const getOrders = async ({ page, limit = 0, status }: Params) => {
  return apiClient.get(
    `/api/admin/orders?page=${page}&limit=${limit}&status=${status}`,
  );
};
