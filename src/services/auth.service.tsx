import { apiUrl } from "../../config.json";
import { SignUp } from "../types/auth.types";
import http from "../utilities/http";

const authApiEndpoint = "/auth";

const signup = async (signup: SignUp) => {
  try {
    const res = await http.post(authApiEndpoint, signup);
  } catch (error) {}
};
