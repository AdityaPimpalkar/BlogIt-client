export type SignUp = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type Login = {
  email: string;
  password: string;
};

export type Token = {
  token: string;
  expiresIn: number;
};

export type TokenData = {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
};

export type UserData = {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  avatar: string;
};
