import axios from "axios";


export const getProducts = async (page: number, limit = 10) => {
  return axios.get(`/api/products?page=${page}&limit=${limit}`);
};
