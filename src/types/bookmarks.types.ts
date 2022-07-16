import { Post } from "./posts.types";

export default interface Bookmarks {
  _id: string;
  post: Post;
  bookmarkedBy: string;
}
