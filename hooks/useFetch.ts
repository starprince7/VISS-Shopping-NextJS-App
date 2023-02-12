import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import apiClient from "../config/apiConfig";

type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

export const useFetch = (url: string) => {
  const [fetchStatus, setFetchStatus] = useState<RequestStatus>("idle");
  const [data, setData] = useState<AxiosResponse[]>([]);
  const [error, setError] = useState<AxiosResponse<any>>([]);

  const fetchData = async (urlWithQueryStr?: string) => {
    try {
      setFetchStatus("loading");
      const response = await apiClient.get(urlWithQueryStr || url);
      setData(response.data);
      setFetchStatus("succeeded");
    } catch (error) {
      setError(error);
      setFetchStatus("failed");
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, error, fetchStatus, fetchData };
};
