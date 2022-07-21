import { HeartIcon, ChatIcon, BookmarkIcon } from "@heroicons/react/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/solid";
import { UserCircleIcon } from "@heroicons/react/solid";
import htmlParser from "html-react-parser";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createBookmark, removeBookmark } from "../services/bookmarks.service";
import { followUser } from "../services/users.service";
import { RootState } from "../types/store.types";

const PostsCard = ({
  id,
  title,
  description,
  publishedOn,
  createdBy,
  bookmarkId,
  isFollowing = false,
  bookmarked,
  bookmarkRemoved,
}: PostsCardProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const [_bookmarkId, setBookmarkId] = useState(bookmarkId);
  const navigate = useNavigate();

  const bookmarkPost = async (id: string) => {
    try {
      setIsBookmarked(true);
      const createdBookmark = await createBookmark(id);
      setBookmarkId(createdBookmark._id);
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
      <div className="w-full px-10 py-6  bg-white rounded-lg shadow-md hover:shadow-xl">
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
                onClick={() =>
                  _bookmarkId ? deleteBookmark(_bookmarkId) : null
                }
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
          <button
            className="text-2xl font-bold text-gray-700 hover:underline"
            onClick={() => navigate(`/posts/${id}`)}
          >
            {title}
          </button>
          <p className="mt-2 text-gray-600 overflow-hidden line-clamp-3 clamp-3-lines">
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
  isFollowing: boolean;
  bookmarkRemoved?: (id: string) => void;
  createdBy: {
    _id: string;
    fullName: string;
    avatar?: string;
  };
};

export default PostsCard;
