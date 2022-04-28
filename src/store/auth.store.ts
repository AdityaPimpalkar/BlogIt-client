import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Token, TokenData, UserData } from "../types/auth.types";
import { Dispatch } from "redux";

const user: UserData = {
  _id: "",
  firstName: "",
  lastName: "",
  fullName: "",
  email: "",
  avatar: "",
};

const initialState = { user };
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokenWithUser: (
      state,
      action: PayloadAction<{ userData: UserData }>
    ) => {
      state.user = { ...action.payload.userData };
    },
  },
});

const { setTokenWithUser } = authSlice.actions;
