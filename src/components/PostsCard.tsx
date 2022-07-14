import { HeartIcon, ChatIcon, BookmarkIcon } from "@heroicons/react/outline";
import { UserCircleIcon } from "@heroicons/react/solid";
import htmlParser from "html-react-parser";
import React from "react";

const PostsCard = ({
  id,
  title,
  description,
  publishedOn,
  createdBy,
}: Props) => {
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
            <BookmarkIcon className="h-7 w-7 mx-1" />
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

type Props = {
  id: string;
  title: string;
  description: string;
  publishedOn?: number;
  createdBy: {
    _id: string;
    fullName: string;
    avatar?: string;
  };
};

export default PostsCard;
