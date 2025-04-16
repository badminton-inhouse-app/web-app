import axios from "axios";
import qs from "qs";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const baseAxios = axios.create({
  baseURL,
  timeout: 10000, // 10 seconds
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    withCredentials: true,
  },
});

baseAxios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

baseAxios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.status === 401) {
      window.location.href = "/sign-in";
    }
    return Promise.reject(error);
  }
);
