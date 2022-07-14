import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.store";
import navigationReducer from "./navigation.store";

export default configureStore({
  reducer: {
    auth: authReducer,
    navigation: navigationReducer,
  },
});
