import axios, { AxiosResponse } from "axios";
import { useState, useEffect, useCallback } from "react";
import apiClient from "../config/apiConfig";

type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

export const useFetch = (url: string) => {
  const [fetchStatus, setFetchStatus] = useState<RequestStatus>("idle");
  const [data, setData] = useState<AxiosResponse[]>([]);
  const [error, setError] = useState("");

  const fetchData = useCallback(
    async (urlWithQueryStr?: string) => {
      try {
        setFetchStatus("loading");
        const response = await apiClient.get(urlWithQueryStr || url);
        setData(response.data);
        setFetchStatus("succeeded");
      } catch (error) {
        setError(error);
        setFetchStatus("failed");
      }
    },
    [url],
  );

  useEffect(() => {
    fetchData();
  }, [url, fetchData]);

  return { data, error, fetchStatus, fetchData };
};
