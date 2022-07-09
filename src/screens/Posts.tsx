import React, { useState } from "react";
import PostsCard from "../components/PostsCard";

const Posts = () => {
  const [posts, setPosts] = useState([
    {
      title: "Build Your New Idea with Laravel Freamwork.",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in.",
      publishedOn: new Date(),
      createdBy: {
        username: "Alex John",
        avatar:
          "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=731&amp;q=80",
      },
    },
  ]);
  return (
    <div className="px-6 py-8">
      <div className="container flex justify-between mx-auto">
        <div className="w-full lg:w-8/12">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-700 md:text-2xl">
              Post
            </h1>
            <div>
              <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <option>Latest</option>
                <option>Last Week</option>
              </select>
            </div>
          </div>
          {posts.map((post, index) => (
            <PostsCard
              key={index}
              title={post.title}
              description={post.description}
              publishedOn={post.publishedOn}
              createdBy={post.createdBy}
            />
          ))}
        </div>
        <div className="hidden w-4/12 -mx-8 lg:block">
          <div className="px-8">
            <h1 className="mb-4 text-xl font-bold text-gray-700">Authors</h1>
            <div className="flex flex-col max-w-sm px-6 py-4 mx-auto bg-white rounded-lg shadow-md">
              <ul className="-mx-4">
                <li className="flex items-center">
                  <img
                    src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=731&amp;q=80"
                    alt="avatar"
                    className="object-cover w-10 h-10 mx-4 rounded-full"
                  />
                  <p>
                    <a
                      href="#"
                      className="mx-1 font-bold text-gray-700 hover:underline"
                    >
                      Alex John
                    </a>
                    <span className="text-sm font-light text-gray-700">
                      Created 23 Posts
                    </span>
                  </p>
                </li>
                <li className="flex items-center mt-6">
                  <img
                    src="https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=333&amp;q=80"
                    alt="avatar"
                    className="object-cover w-10 h-10 mx-4 rounded-full"
                  />
                  <p>
                    <a
                      href="#"
                      className="mx-1 font-bold text-gray-700 hover:underline"
                    >
                      Jane Doe
                    </a>
                    <span className="text-sm font-light text-gray-700">
                      Created 52 Posts
                    </span>
                  </p>
                </li>
                <li className="flex items-center mt-6">
                  <img
                    src="https://images.unsplash.com/photo-1531251445707-1f000e1e87d0?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=281&amp;q=80"
                    alt="avatar"
                    className="object-cover w-10 h-10 mx-4 rounded-full"
                  />
                  <p>
                    <a
                      href="#"
                      className="mx-1 font-bold text-gray-700 hover:underline"
                    >
                      Lisa Way
                    </a>
                    <span className="text-sm font-light text-gray-700">
                      Created 73 Posts
                    </span>
                  </p>
                </li>
                <li className="flex items-center mt-6">
                  <img
                    src="https://images.unsplash.com/photo-1500757810556-5d600d9b737d?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=735&amp;q=80"
                    alt="avatar"
                    className="object-cover w-10 h-10 mx-4 rounded-full"
                  />
                  <p>
                    <a
                      href="#"
                      className="mx-1 font-bold text-gray-700 hover:underline"
                    >
                      Steve Matt
                    </a>
                    <span className="text-sm font-light text-gray-700">
                      Created 245 Posts
                    </span>
                  </p>
                </li>
                <li className="flex items-center mt-6">
                  <img
                    src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=373&amp;q=80"
                    alt="avatar"
                    className="object-cover w-10 h-10 mx-4 rounded-full"
                  />
                  <p>
                    <a
                      href="#"
                      className="mx-1 font-bold text-gray-700 hover:underline"
                    >
                      Khatab Wedaa
                    </a>
                    <span className="text-sm font-light text-gray-700">
                      Created 332 Posts
                    </span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
