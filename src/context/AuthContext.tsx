import React, { createContext, useEffect, useState } from "react";
import { UserData } from "../types/auth.types";

export type IAuthContext = {
  user: UserData;
  setAuth: (user: UserData) => void;
  removeAuth: () => void;
};

export const AuthContext = createContext<IAuthContext>({
  user: {} as UserData,
  setAuth: () => {},
  removeAuth: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData>({
    _id: "",
    firstName: "",
    lastName: "",
    fullName: "",
    email: "",
    avatar: "",
  } as UserData);

  const setAuth = (user: UserData) => {
    setUser({ ...user });
  };

  const removeAuth = () => {
    setUser({
      _id: "",
      firstName: "",
      lastName: "",
      fullName: "",
      email: "",
      avatar: "",
    });
  };

  return (
    <AuthContext.Provider value={{ user, setAuth, removeAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
