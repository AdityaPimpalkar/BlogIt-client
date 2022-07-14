export interface RootState {
  auth: {
    user: {
      _id: string;
      firstName: string;
      lastName: string;
      fullName: string;
      email: string;
      avatar: string;
    };
  };
  navigation: {
    home: boolean;
    explore: boolean;
    bookmarks: boolean;
    newPost: boolean;
    profile: boolean;
  };
}
