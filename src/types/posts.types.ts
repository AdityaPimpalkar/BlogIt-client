import { UserData } from "./auth.types";

export type Posts = {
  _id: string;
  image?: string;
  title: string;
  subTitle?: string;
  description: string;
  isPublished: boolean;
  publishedOn?: number;
  createdBy: string;
};

export type Post = {
  _id: string;
  image?: string;
  title: string;
  subTitle?: string;
  description: string;
  isPublished: boolean;
  publishedOn?: number;
  isFollowing: boolean;
  bookmarked?: { _id: string };
  createdBy: UserData;
};

export type CreatePost = {
  image?: string;
  title: string;
  subTitle?: string;
  description: string;
  isPublished: boolean;
};

export type UpdatePost = {
  _id: string;
  image?: string;
  title: string;
  subTitle?: string;
  description: string;
  isPublished: boolean;
  publishedOn?: number;
};
