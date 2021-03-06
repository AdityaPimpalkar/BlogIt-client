import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { SignUp, Login, Token, TokenData, UserData } from "../types/auth.types";
import http from "../utilities/http";

const authApiEndpoint = "/auth";

export const signup = async (
  signup: SignUp
): Promise<{ tokenData: Token; userData: UserData }> => {
  try {
    const res = await http.post(`${authApiEndpoint}/signup`, signup);
    const tokenData: Token = res.data.tokenData;
    const userData: UserData = res.data.userData;
    return { tokenData, userData };
  } catch (error) {
    const axiosError = error as AxiosError;
    const message: string = axiosError.response?.data.message;
    toast.error(message);
    return Promise.reject();
  }
};

export const login = async (
  login: Login
): Promise<{ tokenData: Token; userData: UserData }> => {
  try {
    const res = await http.post(`${authApiEndpoint}/login`, login);
    const tokenData: Token = res.data.tokenData;
    const userData: UserData = res.data.userData;
    return { tokenData, userData };
  } catch (error) {
    const axiosError = error as AxiosError;
    const message: string = axiosError.response?.data.message;
    toast.error(message);
    return Promise.reject();
  }
};
