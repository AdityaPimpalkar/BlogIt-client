import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { getJwt } from ".";
import config from "../config.json";

const api = axios.create({ baseURL: config.apiUrl });

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedError) {
      if (error.message === "Network Error")
        toast.error("Please check your network.");
      else toast.error("An unexpected error occurrred.");
    }

    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  (request: AxiosRequestConfig) => {
    const token = getJwt();
    request.headers = { Authorization: `Bearer ${token}` };
    return request;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

const endpoints = {
  get: api.get,
  post: api.post,
  put: api.put,
  delete: api.delete,
};

export default endpoints;
