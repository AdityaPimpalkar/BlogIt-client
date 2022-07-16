import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import htmlParser from "html-react-parser";
import { BookmarkIcon, ChatIcon, HeartIcon } from "@heroicons/react/outline";
import { RiEditCircleFill } from "react-icons/ri";
import { Post as PostProps, UpdatePost } from "../types/posts.types";
import { RootState } from "../types/store.types";
import Spinner from "../icons/Spinner";
import { getPostById, updatePost } from "../services/posts.service";
import { UserCircleIcon } from "@heroicons/react/solid";

const Post = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const params = useParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [post, setPost] = useState<PostProps>({
    title: "",
    subTitle: "",
    description: "",
    image: "",
    isPublished: false,
    publishedOn: 0,
    createdBy: {
      _id: "",
      fullName: "",
      avatar: "",
    },
  } as PostProps);

  const loadPost = useCallback(async () => {
    try {
      if (params?.id) {
        const post = await getPostById(params.id);
        setPost({ ...post });
      }
    } catch (error) {
      navigate("/not-found", { replace: true });
    }
  }, []);

  useEffect(() => {
    loadPost();
  }, []);

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
    <div className="px-4 py-8">
      <div className=" max-w-4xl px-10 py-6 mx-auto bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mt-4">
          <a href="#" className="flex items-center">
            {post.createdBy?.avatar ? (
              <img
                src={post.createdBy.avatar}
                alt="avatar"
                className="hidden object-cover w-12 h-12 mr-4 rounded-full sm:block"
              />
            ) : (
              <UserCircleIcon className="hidden object-cover w-12 h-12 mr-4 rounded-full sm:block" />
            )}
            <div>
              <h1 className="font-bold text-gray-700 hover:underline">
                {post.createdBy.fullName}
              </h1>
              <div className="text-sm">
                {post.publishedOn
                  ? new Date(post.publishedOn).toDateString()
                  : null}
              </div>
            </div>
          </a>
          <div className="flex items-center">
            {user._id === post.createdBy._id && (
              <Link to={`/posts/edit/${post._id}`}>
                <RiEditCircleFill className="h-7 w-7 text-tealsecondary mx-1" />
              </Link>
            )}
            <BookmarkIcon className="h-7 w-7 mx-1" />
          </div>
        </div>
        <div className="mt-4">
          <div className="text-3xl font-bold text-gray-700">{post.title}</div>
          <p className="mt-4 text-gray-600 text-xl italic">{post.subTitle}</p>
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
              {isProcessing ? <Spinner className="text-white h-5 w-5" /> : null}
              Publish
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
