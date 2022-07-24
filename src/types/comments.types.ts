export type Comments = {
  _id: string;
  comment: string;
  commentBy: { _id: string; fullName: string; avatar: string };
};

export type CreateComment = {
  postId: string;
  comment: string;
};
