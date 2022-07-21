import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { UserData } from "../types/auth.types";
import { FollowingUsers } from "../types/users.types";
import http from "../utilities/http";

const postsApiEndpoint = "/me";

export const followUser = async (id: string): Promise<UserData> => {
  try {
    const res = await http.put(`${postsApiEndpoint}/follow`, { id });
    const createdPost = res.data;
    return createdPost;
  } catch (error) {
    const axiosError = error as AxiosError;
    const message: string = axiosError.response?.data.message;
    toast.error(message);
    return Promise.reject();
  }
};

export const followingUsers = async (): Promise<FollowingUsers> => {
  try {
    const res = await http.get(`${postsApiEndpoint}/follow`);
    const createdPost = res.data;
    return createdPost;
  } catch (error) {
    const axiosError = error as AxiosError;
    const message: string = axiosError.response?.data.message;
    toast.error(message);
    return Promise.reject();
  }
};
