import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";

type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

export const useFetch = (url: string) => {
  const [fetchStatus, setFetchStatus] = useState<RequestStatus>("idle");
  const [data, setData] = useState<AxiosResponse<any>>([]);
  const [error, setError] = useState<AxiosResponse<any>>([]);

  const fetchData = async () => {
    try {
      setFetchStatus("loading");
      const response = await axios.get(url);
      setData(response.data);
      setFetchStatus("succeeded");
    } catch (error) {
      setError(error);
      setFetchStatus("failed");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, error, fetchStatus };
};
