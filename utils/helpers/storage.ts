const sessionKey = "viss-store-session";

export const setAuthToken = (token: string): void => {
  localStorage.setItem(sessionKey, token);
};

export const getAuthToken = (): string => {
  return localStorage.getItem(sessionKey) || "";
};

export const removeAuthToken = (): void => {
  localStorage.removeItem(sessionKey);
};
