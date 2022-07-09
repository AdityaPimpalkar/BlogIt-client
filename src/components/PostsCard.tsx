import { HeartIcon, ChatIcon, BookmarkIcon } from "@heroicons/react/outline";
import React from "react";

const PostsCard = ({ title, description, publishedOn, createdBy }: Props) => {
  return (
    <div className="mt-6">
      <div className=" max-w-4xl px-10 py-6 mx-auto bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mt-4">
          <a href="#" className="flex items-center">
            <img
              src={createdBy.avatar}
              alt="avatar"
              className="hidden object-cover w-10 h-10 mr-4 rounded-full sm:block"
            />
            <h1 className="font-bold text-gray-700 hover:underline">
              {createdBy.username}
            </h1>
          </a>
          <div className="flex items-center">
            <BookmarkIcon className="h-7 w-7 mx-1" />
          </div>
        </div>
        <div className="mt-2">
          <a
            href="#"
            className="text-2xl font-bold text-gray-700 hover:underline"
          >
            {title}
          </a>
          <p className="mt-2 text-gray-600 overflow-hidden line-clamp-3">
            {description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="font-light text-gray-600">
            {publishedOn.toDateString()}
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
  title: string;
  description: string;
  publishedOn: Date;
  createdBy: {
    username: string;
    avatar?: string;
  };
};

export default PostsCard;
