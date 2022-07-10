export type Posts = {
  _id: string;
  image: string;
  title: string;
  subTitle: string;
  description: string;
  isPublished: boolean;
  publishedOn: number;
  createdBy: string;
};

export type CreatePost = {
  image?: string;
  title: string;
  subTitle: string;
  description: string;
  isPublished: boolean;
};
