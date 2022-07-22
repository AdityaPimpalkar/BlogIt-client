import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import htmlParser from "html-react-parser";
import { BookmarkIcon, ChatIcon, HeartIcon } from "@heroicons/react/outline";
import {
  UserCircleIcon,
  BookmarkIcon as BookmarkSolidIcon,
  PencilIcon,
} from "@heroicons/react/solid";
import { RiEditCircleFill } from "react-icons/ri";
import { Post as PostProps, UpdatePost } from "../types/posts.types";
import { RootState } from "../types/store.types";
import Spinner from "../icons/Spinner";
import {
  exploreByPostId,
  getPostById,
  updatePost,
} from "../services/posts.service";
import { createBookmark, removeBookmark } from "../services/bookmarks.service";
import { isEmpty } from "../utilities";
import { followUser } from "../services/users.service";

const Post = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [post, setPost] = useState<PostProps>({
    title: "",
    subTitle: "",
    description: "",
    image: "",
    isPublished: false,
    publishedOn: 0,
    bookmarked: { _id: "" },
    isFollowing: false,
    createdBy: {
      _id: "",
      fullName: "",
      avatar: "",
    },
  } as PostProps);
  const params = useParams();
  const navigate = useNavigate();
  const createdBy = post.createdBy;
  const bookmark = post.bookmarked ? post.bookmarked : null;

  const loadPost = useCallback(async () => {
    try {
      if (params?.id) {
        const post = await getPostById(params.id);
        if (post.bookmarked) setBookmarked(true);
        setPost({ ...post });
      }
    } catch (error) {
      navigate("/not-found", { replace: true });
    }
  }, [user]);

  const loadExplorePost = useCallback(async () => {
    try {
      if (params?.id) {
        const post = await exploreByPostId(params.id);
        setPost({ ...post });
      }
    } catch (error) {
      navigate("/not-found", { replace: true });
    }
  }, []);

  useEffect(() => {
    if (user._id) loadPost();
    else loadExplorePost();
  }, []);

  const bookmarkPost = async (id: string) => {
    try {
      setBookmarked(true);
      const createdBookmark = await createBookmark(id);
      setPost({ ...post, bookmarked: { _id: createdBookmark._id } });
      toast.success("Added to bookmarks!");
    } catch (error) {
      setBookmarked(false);
    }
  };

  const deleteBookmark = async (id: string) => {
    try {
      setBookmarked(false);
      await removeBookmark(id);
    } catch (error) {
      setBookmarked(true);
    }
  };

  const follow = async (id: string) => {
    try {
      setPost({ ...post, isFollowing: true });
      await followUser(id);
      toast.success(`You're now following ${createdBy.fullName}`);
    } catch (error) {
      setPost({ ...post, isFollowing: false });
    }
  };

  const FollowButton = () => {
    return user._id && createdBy._id !== user._id ? (
      !post.isFollowing ? (
        <button
          className="text-sm p-0.5 px-2 text-white rounded-full bg-tealsecondary"
          onClick={() => follow(createdBy._id)}
        >
          Follow
        </button>
      ) : null
    ) : null;
  };

  const handlePublish = async () => {
    try {
      setIsProcessing(true);
      const { _id, title, subTitle, description, image } = post;
      const updatedPost = await updatePost({
        _id,
        title,
        subTitle,
        description,
        image,
        isPublished: true,
      } as UpdatePost);
      if (updatedPost._id) {
        toast.success("Post published!");
        setIsProcessing(false);
        setPost({ ...updatedPost });
      }
    } catch (error) {
      setIsProcessing(false);
    }
  };
  return (
    <div className=" w-full">
      <div className="container flex flex-row">
        <div className="w-full px-7 py-4 lg:w-3/4">
          <div className=" px-10 py-6 mx-auto bg-white rounded-lg shadow-xl">
            <div className="flex items-center justify-between mt-4">
              <a href="#" className="flex items-center">
                {createdBy?.avatar ? (
                  <img
                    src={createdBy.avatar}
                    alt="avatar"
                    className="hidden object-cover w-12 h-12 mr-4 rounded-full sm:block"
                  />
                ) : (
                  <UserCircleIcon className="hidden object-cover w-12 h-12 mr-4 rounded-full sm:block" />
                )}
                <div>
                  <h1 className="font-bold text-gray-700 hover:underline">
                    {createdBy.fullName}
                  </h1>
                  <div className="text-sm">
                    {post.publishedOn
                      ? new Date(post.publishedOn).toDateString()
                      : null}
                  </div>
                </div>
              </a>
              <div className="flex items-center">
                {user._id === createdBy._id && (
                  <button onClick={() => navigate(`/posts/edit/${post._id}`)}>
                    <RiEditCircleFill className="h-7 w-7 text-tealsecondary mx-1" />
                  </button>
                )}
                <FollowButton />
                {isEmpty(user._id) ? (
                  <BookmarkIcon
                    className="h-7 w-7 mx-1 cursor-pointer"
                    onClick={() => navigate("/login")}
                  />
                ) : bookmarked ? (
                  <BookmarkSolidIcon
                    className="h-7 w-7 mx-1 cursor-pointer"
                    onClick={() =>
                      bookmark ? deleteBookmark(bookmark._id) : null
                    }
                  />
                ) : (
                  <BookmarkIcon
                    className="h-7 w-7 mx-1 cursor-pointer"
                    onClick={() => bookmarkPost(post._id)}
                  />
                )}
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold text-gray-700">
                {post.title}
              </div>
              <p className="mt-4 text-gray-600 text-xl italic">
                {post.subTitle}
              </p>
            </div>
            <div className="mt-4">{htmlParser(post.description)}</div>
            {post.isPublished ? (
              <div className="flex items-center justify-between mt-4">
                <span className="font-light text-gray-600"></span>
                <div className="flex items-center">
                  <HeartIcon className="h-7 w-7 mx-1" />
                  123
                  <ChatIcon className="h-7 w-7 mx-1" />
                  50
                </div>
              </div>
            ) : (
              <div className="mt-6 flex flex-row justify-end">
                <button
                  type="button"
                  className={`px-6 py-4 flex justify-center items-center text-white bg-tealsecondary rounded-md focus:outline-none ${
                    isProcessing ?? "cursor-not-allowed"
                  }`}
                  onClick={handlePublish}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <Spinner className="text-white h-5 w-5" />
                  ) : null}
                  Publish
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="hidden w-1/4 bg-white lg:block min-h-screen border border-white border-l-gray-300 right-0 sticky">
          <h1 className="mx-4 my-2 text-xl font-bold text-gray-700">
            Post author
          </h1>
          <div className="">
            <div className="flex flex-col max-w-sm px-4 mx-auto">
              {user._id ? (
                <div className="flex flex-col">
                  <div className="relative py-2 w-28">
                    <img
                      src={createdBy.avatar}
                      alt="avatar"
                      className="object-cover w-28 h-28 rounded-full"
                    />
                    {user._id === createdBy._id ? (
                      <PencilIcon className="h-7 w-7 text-white absolute right-3 bottom-2 p-1 bg-tealsecondary rounded-full border border-2" />
                    ) : null}
                  </div>
                  <div className="text-2xl">{createdBy.fullName}</div>
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

export default Post;
