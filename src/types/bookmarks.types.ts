import { Post } from "./posts.types";

export default interface Bookmarks {
  _id: string;
  post: {
    _id: string;
    image?: string;
    title: string;
    subTitle?: string;
    description: string;
    isPublished: boolean;
    publishedOn?: number;
    bookmarked?: Array<[]>;
    createdBy: {
      _id: string;
      fullName: string;
      avatar?: string;
    };
  };
  bookmarkedBy: string;
}
