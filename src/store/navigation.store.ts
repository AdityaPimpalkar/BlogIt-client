import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Navigation } from "../types/navigation.types";

const navigation: Navigation = {
  home: false,
  explore: true,
  bookmarks: false,
  newPost: false,
  profile: false,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState: navigation,
  reducers: {
    setNavigation: (state, action: PayloadAction<{ nav: string }>) => {
      const defaultNav: Navigation = {
        home: false,
        explore: false,
        bookmarks: false,
        newPost: false,
        profile: false,
      };
      state = { ...defaultNav, [action.payload.nav]: true };
      return state;
    },
  },
});

export const { setNavigation } = navigationSlice.actions;
export default navigationSlice.reducer;
