import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HeartIcon, ChatIcon, BookmarkIcon } from "@heroicons/react/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/solid";
import { UserCircleIcon } from "@heroicons/react/solid";
import { createBookmark, removeBookmark } from "../services/bookmarks.service";
import { RootState } from "../types/store.types";
import { convertToPlain } from "../utilities";

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
      <div className="px-5 py-3 w-full lg:px-10 lg:py-6  bg-white rounded-lg shadow-md hover:shadow-xl">
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
            <h1 className="text-base lg:text-base font-bold text-gray-700 hover:underline">
              {createdBy.fullName}
            </h1>
          </a>
          <div className="flex items-center">
            {isBookmarked ? (
              <BookmarkSolidIcon
                className="h-5 w-5 md:h-7 md:w-7 mx-1 cursor-pointer"
                onClick={() =>
                  _bookmarkId ? deleteBookmark(_bookmarkId) : null
                }
              />
            ) : (
              <BookmarkIcon
                className="h-5 w-5 md:h-7 md:w-7 mx-1 cursor-pointer"
                onClick={() => bookmarkPost(id)}
              />
            )}
          </div>
        </div>
        <div className="mt-2">
          <button
            className="text-sm font-semibold lg:text-2xl lg:font-bold text-gray-700 hover:underline text-left"
            onClick={() => navigate(`/posts/${id}`)}
          >
            {title}
          </button>
          <p className="text-sm mt-2 text-gray-600 overflow-hidden line-clamp-3">
            {convertToPlain(description).replace(/(\r\n|\n|\r)/gm, "")}
          </p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm font-light text-gray-600">
            {publishedOn ? new Date(publishedOn).toDateString() : null}
          </span>
          {/* <div className="flex items-center">
            <HeartIcon className="h-7 w-7 mx-1" />
            123
            <ChatIcon className="h-7 w-7 mx-1" />
            50
          </div> */}
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
