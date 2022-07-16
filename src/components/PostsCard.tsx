import { HeartIcon, ChatIcon, BookmarkIcon } from "@heroicons/react/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/solid";
import { UserCircleIcon } from "@heroicons/react/solid";
import htmlParser from "html-react-parser";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { createBookmark, removeBookmark } from "../services/bookmarks.service";

const PostsCard = ({
  id,
  title,
  description,
  publishedOn,
  createdBy,
  bookmarkId,
  bookmarked,
  bookmarkRemoved,
}: PostsCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const bookmarkPost = async (id: string) => {
    try {
      setIsBookmarked(true);
      await createBookmark(id);
      toast.success("Added to bookmarks!");
    } catch (error) {
      setIsBookmarked(false);
    }
  };

  const deleteBookmark = async (id: string) => {
    try {
      setIsBookmarked(false);
      await removeBookmark(id);
      if (bookmarkRemoved) bookmarkRemoved(id);
    } catch (error) {
      setIsBookmarked(true);
    }
  };

  return (
    <div className="mt-6">
      <div className=" max-w-4xl px-10 py-6 mx-auto bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mt-4">
          <a href="#" className="flex items-center">
            {createdBy?.avatar ? (
              <img
                src={createdBy.avatar}
                alt="avatar"
                className="hidden object-cover w-10 h-10 mr-4 rounded-full sm:block"
              />
            ) : (
              <UserCircleIcon className="hidden object-cover w-10 h-10 mr-4 rounded-full sm:block" />
            )}
            <h1 className="font-bold text-gray-700 hover:underline">
              {createdBy.fullName}
            </h1>
          </a>
          <div className="flex items-center">
            {isBookmarked ? (
              <BookmarkSolidIcon
                className="h-7 w-7 mx-1 cursor-pointer"
                onClick={() => (bookmarkId ? deleteBookmark(bookmarkId) : null)}
              />
            ) : (
              <BookmarkIcon
                className="h-7 w-7 mx-1 cursor-pointer"
                onClick={() => bookmarkPost(id)}
              />
            )}
          </div>
        </div>
        <div className="mt-2">
          <a
            href={`http://localhost:3000/posts/${id}`}
            className="text-2xl font-bold text-gray-700 hover:underline"
          >
            {title}
          </a>
          <p className="mt-2 text-gray-600 overflow-hidden line-clamp-3">
            {htmlParser(description)}
          </p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="font-light text-gray-600">
            {publishedOn ? new Date(publishedOn).toDateString() : null}
          </span>
          <div className="flex items-center">
            <HeartIcon className="h-7 w-7 mx-1" />
            123
            <ChatIcon className="h-7 w-7 mx-1" />
            50
          </div>
        </div>
      </div>
    </div>
  );
};

type PostsCardProps = {
  id: string;
  title: string;
  description: string;
  publishedOn?: number;
  bookmarkId?: string;
  bookmarked: boolean;
  bookmarkRemoved?: (id: string) => void;
  createdBy: {
    _id: string;
    fullName: string;
    avatar?: string;
  };
};

export default PostsCard;
