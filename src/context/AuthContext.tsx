import React, { createContext } from "react";
import { UserData } from "../types/auth.types";

const AuthContext = createContext<UserData>({
  _id: "",
  firstName: "",
  lastName: "",
  fullName: "",
  email: "",
  avatar: "",
});

const AuthProvider = () => {
  return null;
};

export default AuthProvider;
