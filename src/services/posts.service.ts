import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { CreatePost, Post, Posts, UpdatePost } from "../types/posts.types";
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

export const updatePost = async (post: UpdatePost): Promise<Post> => {
  try {
    const res = await http.put(`${postsApiEndpoint}`, post);
    const updatedPost = res.data as Post;
    return updatedPost;
  } catch (error) {
    const axiosError = error as AxiosError;
    const message: string = axiosError.response?.data.message;
    toast.error(message);
    return Promise.reject();
  }
};

export const getPost = async (id: string): Promise<Post> => {
  try {
    const res = await http.get(`${postsApiEndpoint}/edit/${id}`);
    const post = res.data as Post;
    return post;
  } catch (error) {
    const axiosError = error as AxiosError;
    const message: string = axiosError.response?.data.message;
    toast.error(message);
    return Promise.reject();
  }
};

export const getPostById = async (id: string): Promise<Post> => {
  try {
    const res = await http.get(`${postsApiEndpoint}/${id}`);
    const post = res.data as Post;
    return post;
  } catch (error) {
    const axiosError = error as AxiosError;
    const message: string = axiosError.response?.data.message;
    toast.error(message);
    return Promise.reject();
  }
};

export const explorePosts = async (): Promise<Post[]> => {
  try {
    const res = await http.get(`${postsApiEndpoint}/explore`);
    const post = res.data;
    return post;
  } catch (error) {
    const axiosError = error as AxiosError;
    const message: string = axiosError.response?.data.message;
    toast.error(message);
    return Promise.reject();
  }
};
