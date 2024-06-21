import axios from "axios";


type Params = {
  page: number;
  limit?: number;
  status?: string;
};

export const getOrders = async ({ page, limit = 0, status }: Params) => {
  return axios.get(
    `/api/admin/orders?page=${page}&limit=${limit}&status=${status}`,
  );
};
