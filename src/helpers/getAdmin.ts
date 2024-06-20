import apiClient from "../config/apiConfig";

export const getAdminAccount = (id: string) => {
  return apiClient.get(`/api/admin/superUser/${id}`);
};
