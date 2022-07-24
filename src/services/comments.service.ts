import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Comments, CreateComment } from "../types/comments.types";
import http from "../utilities/http";

const commentsApiEndpoint = "/comments";

export const createComment = async (
  comment: CreateComment
): Promise<Comments> => {
  try {
    const res = await http.post(`${commentsApiEndpoint}`, comment);
    const newComment = res.data as Comments;
    return newComment;
  } catch (error) {
    const axiosError = error as AxiosError;
    const message: string = axiosError.response?.data.message;
    toast.error(message);
    return Promise.reject();
  }
};

export const deleteComment = async (commentId: string): Promise<Comments> => {
  try {
    const res = await http.delete(`${commentsApiEndpoint}/${commentId}`);
    const newComment = res.data as Comments;
    return newComment;
  } catch (error) {
    const axiosError = error as AxiosError;
    const message: string = axiosError.response?.data.message;
    toast.error(message);
    return Promise.reject();
  }
};

export const getComments = async (postId: string): Promise<Comments[]> => {
  try {
    const res = await http.get(`${commentsApiEndpoint}?postId=${postId}`);
    const comments = res.data as Comments[];
    return comments;
  } catch (error) {
    const axiosError = error as AxiosError;
    const message: string = axiosError.response?.data.message;
    toast.error(message);
    return Promise.reject();
  }
};
