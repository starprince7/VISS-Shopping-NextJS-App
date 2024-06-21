import axios from "axios";

export const getCustomers = async (page: number, limit = 10) => {
  return axios.get(
    `/api/admin/customers?page=${page}&limit=${limit}`,
  );
};
