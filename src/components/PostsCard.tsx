import { HeartIcon, ChatIcon, BookmarkIcon } from "@heroicons/react/outline";
import React from "react";

const PostsCard = ({
  key,
  title,
  description,
  publishedOn,
  createdBy,
}: Props) => {
  return (
    <div className="mt-6" key={key}>
      <div className=" max-w-4xl px-10 py-6 mx-auto bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mt-4">
          <a href="#" className="flex items-center">
            <img
              // src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=731&amp;q=80"
              src={createdBy.avatar}
              alt="avatar"
              className="hidden object-cover w-10 h-10 mr-4 rounded-full sm:block"
            />
            <h1 className="font-bold text-gray-700 hover:underline">
              Alex John{createdBy.username}
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
            Build Your New Idea with Laravel Freamwork.{title}
          </a>
          <p className="mt-2 text-gray-600 overflow-hidden line-clamp-3">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
            expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos
            enim reprehenderit nisi, accusamus delectus nihil quis facere in
            modi ratione libero! Lorem ipsum dolor sit, amet consectetur
            adipisicing elit.{description}
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
  key: number;
  title: string;
  description: string;
  publishedOn: Date;
  createdBy: {
    username: string;
    avatar?: string;
  };
};
