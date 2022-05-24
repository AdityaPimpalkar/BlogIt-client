import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Token, TokenData, UserData } from "../types/auth.types";
import { Dispatch } from "redux";

let dispatch: Dispatch;

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
  },
});

const { setUser } = authSlice.actions;
export default authSlice.reducer;

export const setAuth = (userData: UserData) => {
  dispatch(setUser({ userData }));
};
