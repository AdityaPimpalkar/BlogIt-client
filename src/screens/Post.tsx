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
  TrashIcon,
} from "@heroicons/react/solid";
import { RiEditCircleFill } from "react-icons/ri";
import { Post as PostProps, UpdatePost } from "../types/posts.types";
import { Comments, CreateComment } from "../types/comments.types";
import { RootState } from "../types/store.types";
import {
  exploreByPostId,
  getPostById,
  updatePost,
} from "../services/posts.service";
import { createBookmark, removeBookmark } from "../services/bookmarks.service";
import { followUser } from "../services/users.service";
import {
  createComment,
  deleteComment,
  getComments,
} from "../services/comments.service";
import { isEmpty } from "../utilities";
import Spinner from "../icons/Spinner";
const Post = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [post, setPost] = useState<PostProps>({
    _id: "",
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
  const [comments, setComments] = useState<Comments[]>([]);
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
        const comments = await getComments(post._id);
        setComments([...comments]);
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

  const FollowButton = () => {
    const follow = async (id: string) => {
      try {
        setPost({ ...post, isFollowing: true });
        await followUser(id);
        toast.success(`You're now following ${createdBy.fullName}`);
      } catch (error) {
        setPost({ ...post, isFollowing: false });
      }
    };

    return user._id && createdBy._id !== user._id ? (
      !post.isFollowing ? (
        <button
          className="w-14 text-sm p-0.5 px-2 text-white rounded-full bg-tealsecondary"
          onClick={() => follow(createdBy._id)}
        >
          Follow
        </button>
      ) : null
    ) : null;
  };

  const Comments = () => {
    const [comment, setComment] = useState("");

    const postComment = async (e: React.KeyboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      try {
        const commentObj: CreateComment = {
          postId: post._id,
          comment,
        };
        const createdComment = await createComment(commentObj);
        const newComment = {
          _id: createdComment._id,
          ...commentObj,
          commentBy: {
            _id: user._id,
            avatar: user.avatar,
            fullName: user.fullName,
          },
        };

        setComments([...comments, newComment]);
      } catch (error) {}
    };

    const removeComment = async (commentId: string) => {
      try {
        await deleteComment(commentId);
        const updatedComments = comments.filter(
          (comment) => comment._id !== commentId
        );
        setComments([...updatedComments]);
      } catch (error) {}
    };

    return user._id && post.isPublished ? (
      <>
        <div className="text-xl text-gray-500 my-2">
          Comments ({comments.length})
        </div>
        <div className="flex flex-col w-3/4">
          {comments.map(({ _id, commentBy, comment }, index) => (
            <div className="my-2" key={index}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={commentBy.avatar}
                    className="h-6 w-6 rounded-full mr-2"
                  />
                  <div className="text-sm font-bold">{commentBy.fullName}</div>
                </div>
                {user._id === commentBy._id ? (
                  <button
                    className="ml-auto"
                    onClick={() => removeComment(_id)}
                  >
                    <TrashIcon className="h-5 w-5 " />
                  </button>
                ) : null}
              </div>
              <div className="italic text-sm ml-8">{comment}</div>
            </div>
          ))}

          <div className="flex flex-row items-center mb-1">
            <img src={user.avatar} className="h-8 w-8 rounded-full mr-2" />
            <input
              type="text"
              value={comment}
              placeholder="Write a comment..."
              className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:border-tealprimary-400 focus:ring focus:ring-tealprimary focus:border-tealprimary-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) =>
                e.key == "Enter" && comment !== "" ? postComment(e) : null
              }
            />
          </div>
        </div>
      </>
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
                ) : post.isPublished ? (
                  <BookmarkIcon
                    className="h-7 w-7 mx-1 cursor-pointer"
                    onClick={() => bookmarkPost(post._id)}
                  />
                ) : null}
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
                  {comments.length}
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
            <Comments />
          </div>
        </div>
        <div className="hidden w-1/4 bg-white lg:block min-h-screen border border-white border-l-gray-300 right-0 sticky">
          <h1 className="mx-4 my-2 text-xl font-bold text-gray-700">
            {user._id ? "Post author" : ""}
          </h1>
          <div className="">
            <div className="flex flex-col max-w-sm px-4 mx-auto">
              {user._id ? (
                <>
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
                    <div className="italic text-base text-gray-500 mb-1">
                      0 followers
                    </div>
                  </div>
                  <FollowButton />
                </>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
