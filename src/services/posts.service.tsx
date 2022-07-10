import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { CreatePost, Posts } from "../types/posts.types";
import { getJwt } from "../utilities";
import http from "../utilities/http";

const postsApiEndpoint = "/posts";

export const createPost = async (posts: CreatePost): Promise<Posts> => {
  try {
    const res = await http.post(`${postsApiEndpoint}`, posts);
    const createdPost = res.data;
    return createdPost;
  } catch (error) {
    const axiosError = error as AxiosError;
    const message: string = axiosError.response?.data.message;
    toast.error(message);
    return Promise.reject();
  }
};
