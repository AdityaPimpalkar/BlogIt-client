import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.store";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
