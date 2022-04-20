export type SignUp = {
  firstName: string;
  lastName: string;
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
