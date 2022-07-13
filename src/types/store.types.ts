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
}
