import apiClient from "../config/apiConfig";
import { useQuery } from "@tanstack/react-query";

export const useFetch = (url: string) => {
  return useQuery({
    queryKey: [url],
    queryFn: async () => await apiClient.get(url),
    retry: 3,
  });
};
