import { AxiosError } from "axios";
import { toast } from "react-toastify";
import Bookmarks from "../types/bookmarks.types";
import http from "../utilities/http";

const bookmarksApiEndpoint = "/bookmarks";

export const createBookmark = async (postId: string): Promise<Bookmarks> => {
  try {
    const res = await http.post(`${bookmarksApiEndpoint}`, { postId });
    const data = res.data as Bookmarks;
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    const message: string = axiosError.response?.data.message;
    toast.error(message);
    return Promise.reject();
  }
};

export const removeBookmark = async (postId: string): Promise<Bookmarks> => {
  try {
    const res = await http.delete(`${bookmarksApiEndpoint}/${postId}`);
    const data = res.data as Bookmarks;
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    const message: string = axiosError.response?.data.message;
    toast.error(message);
    return Promise.reject();
  }
};

export const getBookmarks = async (): Promise<Bookmarks[]> => {
  try {
    const res = await http.get(`${bookmarksApiEndpoint}`);
    const data = res.data;
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    const message: string = axiosError.response?.data.message;
    toast.error(message);
    return Promise.reject();
  }
};
