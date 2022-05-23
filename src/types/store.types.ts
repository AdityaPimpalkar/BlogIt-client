export interface RootState {
  auth: {
    user: {
      firstName: string;
      lastName: string;
      fullName: string;
      email: string;
      avatar: string;
    };
  };
}
