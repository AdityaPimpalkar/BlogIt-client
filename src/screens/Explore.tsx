import {
  PencilIcon,
  BookmarkIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiDraftFill } from "react-icons/ri";
import { BsFileEarmarkCheckFill } from "react-icons/bs";
import PostsCard from "../components/PostsCard";
import { explorePosts, getPosts } from "../services/posts.service";
import { Post } from "../types/posts.types";
import { RootState } from "../types/store.types";
import { isEmpty } from "../utilities";

const Explore = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  const loadPosts = useCallback(async () => {
    try {
      const myPosts = await getPosts();
      setPosts([...myPosts]);
    } catch (error) {}
  }, [user]);

  const loadExplorePosts = useCallback(async () => {
    try {
      const loadedPosts = await explorePosts();
      setPosts([...loadedPosts]);
    } catch (error) {}
  }, []);

  useEffect(() => {
    if (user._id) loadPosts();
    else loadExplorePosts();
  }, [user]);

  return (
    <div className="w-full">
      <div className="flex flex-row">
        <div className="px-7 py-4 w-3/4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-700 md:text-2xl">
              Explore
            </h1>
            <div>
              <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <option>Latest</option>
                <option>Last Week</option>
              </select>
            </div>
          </div>
          {posts.map((post, index) => {
            const bookmarked = post.bookmarked ? true : false;

            const bookmark = post.bookmarked ? post.bookmarked : null;

            return (
              <PostsCard
                key={index}
                id={post._id}
                title={post.title}
                description={post.description}
                publishedOn={post.publishedOn}
                bookmarkId={bookmark?._id}
                bookmarked={bookmarked}
                isFollowing={post.isFollowing}
                createdBy={post.createdBy}
              />
            );
          })}
        </div>
        <div className="hidden w-1/4 bg-white lg:block min-h-screen border border-white border-l-gray-300 right-0 sticky">
          <h1 className="mx-4 my-2 text-xl font-bold text-gray-700">You</h1>
          <div className="">
            <div className="flex flex-col max-w-sm px-4 mx-auto">
              {user._id ? (
                <div className="flex flex-col items-start">
                  <div className="relative py-2 w-28">
                    <img
                      src={user.avatar}
                      alt="avatar"
                      className="object-cover w-28 h-28 rounded-full"
                    />
                    {user._id === user._id ? (
                      <PencilIcon className="h-7 w-7 text-white absolute right-3 bottom-2 p-1 bg-tealsecondary rounded-full border border-2" />
                    ) : null}
                  </div>
                  <div className="text-2xl">{user.fullName}</div>
                  <button
                    className="hover:underline flex flex-row items-center my-2"
                    onClick={() => navigate("/posts")}
                  >
                    <BsFileEarmarkCheckFill className="text-tealsecondary h-6 w-6 mr-1" />{" "}
                    My Posts
                  </button>
                  <button
                    className="hover:underline flex flex-row items-center my-2"
                    onClick={() => navigate("/drafts")}
                  >
                    <RiDraftFill className="text-tealsecondary h-6 w-6 mr-1" />{" "}
                    My Drafts
                  </button>
                  <button
                    className="hover:underline flex flex-row items-center my-2"
                    onClick={() => navigate("/bookmarks")}
                  >
                    <BookmarkIcon className="text-tealsecondary h-6 w-6 mr-1" />{" "}
                    My Bookmarks
                  </button>
                </div>
              ) : (
                <div className="flex flex-row items-center">
                  <button
                    onClick={() => navigate("/login")}
                    className="text-white p-2 w-3/4 bg-tealsecondary rounded-full text-sm"
                  >
                    Get started
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    className="w-1/4 bg-white rounded-full text-sm"
                  >
                    Sign up
                  </button>
                </div>
              )}

              {/* <ul className="-mx-4">
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
                  </p>
                </li>
              </ul> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
