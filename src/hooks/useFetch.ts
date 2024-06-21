import { useQuery } from "@tanstack/react-query";

import apiClient from "../config/apiConfig";

export const useFetch = (url: string) => {
  return useQuery({
    queryKey: [url],
    queryFn: () => fetchUrl(url),
    retry: 3,
  });
};

async function fetchUrl(url: string) {
  const res = await apiClient.get(url);
  console.log("useFetch response:", res);
  return res.data;
}
