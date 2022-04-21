import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
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

function setJwtHeader(jwt: string) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

export default {
  get: api.get,
  post: api.post,
  put: api.put,
  delete: api.delete,
  setJwtHeader,
};
