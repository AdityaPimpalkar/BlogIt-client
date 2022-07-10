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

const authSlice = createSlice({
  name: "auth",
  initialState: { user },
  reducers: {
    setUser: (state, action: PayloadAction<{ userData: UserData }>) => {
      state.user = { ...action.payload.userData };
    },
    logoutUser: (state) => {
      state.user = { ...user };
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
