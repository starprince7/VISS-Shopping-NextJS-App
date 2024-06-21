import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

// import { DeviceUUID } from "device-uuid";
import packageJson from "../../package.json";
import { store } from "../store";
import { logOutAction } from "../store/AdminSlice/reducer";
import * as StorageService from "../utils/helpers/storage";

let apiClient2;

// Prevent localStorage from becoming undefined.
if (typeof window !== "undefined") {
  // const deviceUUID = new DeviceUUID().get();
  const lastSession = new Date(`${localStorage.getItem("session")}`).toString();
  const timeBeforeUnload = new Date(
    `${localStorage.getItem("timeBeforeUnload")}`,
  ).toString();
  const fiveMins = 5 * 60 * 1000;

  const setTimeBeforeUnload = () => {
    localStorage.setItem("timeBeforeUnload", `${new Date()}`);
  };

  apiClient2 = axios.create({
    headers: {
      "Content-Type": "application/json",
      vissStoreSrc: "viss_store/webapp/package-version",
      // device: deviceUUID,
      session:
        lastSession && lastSession !== "Invalid Date"
          ? lastSession
          : `${new Date()}`,
    },
  });

  apiClient2.interceptors.request.use(
    async (request: AxiosRequestConfig) => {
      const token = await StorageService.getAuthToken();
      if (!lastSession || lastSession === "Invalid Date") {
        localStorage.setItem("session", `${new Date()}`);
      }
      const mountingTime = new Date();
      window.addEventListener("beforeunload", setTimeBeforeUnload);

      if (
        lastSession &&
        lastSession !== "Invalid Date" &&
        +mountingTime - +new Date(timeBeforeUnload) > fiveMins
      ) {
        const tempTime = `${new Date()}`;
        localStorage.setItem("session", tempTime);
        request.headers = { ...request.headers, session: tempTime };
      }

      if (token) {
        request.headers = {
          ...request.headers,
          authorization: `Bearer ${token}`,
        };
      } else {
        request.headers = {
          ...request.headers,
          authorization: request?.headers?.authorization ?? "",
        };
      }

      const session = new Date().getTime();
      const { name, version } = packageJson;
      const vissStoreSrc = `${name}/${version}`;

      request.headers = {
        ...request.headers,
        //   device: deviceUUID,
        session: session.toString(),
        vissStoreSrc,
      };

      return request;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  apiClient2.interceptors.response.use(
    async (response: AxiosResponse<any, any>) => {
      return response;
    },
    async (error: AxiosError) => {
      if (error.response?.status && error.response?.status === 401) {
        store?.dispatch(logOutAction());
      }
      return Promise.reject(error);
    },
  );
}

const apiClient = apiClient2;

export default apiClient;
