const sessionKey = "viss-store-session";
const adminUser = "admin-user-id";

export const setAuthToken = (token: string): void => {
  localStorage.setItem(sessionKey, token);
};

export const getAuthToken = (): string => {
  return localStorage.getItem(sessionKey) || "";
};

export const removeAuthToken = (): void => {
  localStorage.removeItem(sessionKey);
};

const setAdminId = (id: string) => {
  localStorage.setItem(adminUser, id);
};

const removeAdminId = () => {
  localStorage.removeItem(adminUser);
};

const getAdminId = () => {
  return localStorage.getItem(adminUser);
};

export const StorageService = {
  setAuthToken,
  getAuthToken,
  removeAuthToken,
  setAdminId,
  getAdminId,
  removeAdminId,
};
