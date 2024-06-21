import axios from "axios";


export const getAdminAccount = (id: string) => {
  return axios.get(`/api/admin/superUser/${id}`);
};
