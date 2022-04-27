import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Token, TokenData, UserData } from "../types/auth.types";

const user: UserData = {
  _id: "",
  firstName: "",
  lastName: "",
  fullName: "",
  email: "",
  avatar: "",
};

const token: Token = {
  token: "",
  expiresIn: 0,
};

const initialState = { user, token };
createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TokenData>) => {},
  },
});
