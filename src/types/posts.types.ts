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
  createdBy: {
    fullName: string;
    avatar?: string;
  };
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
