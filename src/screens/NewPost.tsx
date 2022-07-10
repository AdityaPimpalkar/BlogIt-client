import Joi from "joi";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "../icons/Spinner";
import { CreatePost } from "../types/posts.types";
import { createPost } from "../services/posts.service";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<CreatePost>({} as CreatePost);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const form = {
    title: Joi.string().required().min(3).max(100).label("Title"),
    subTitle: Joi.string().required().min(3).max(100).label("Subtitle"),
    description: Joi.string().required().min(3).max(500).label("Description"),
    isPublished: Joi.allow(),
  };

  const handleChange = (
    element: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const { name, value } = element.target;
    const data = { [name]: value };

    const schemaProp = Joi.object({
      [name]: form[name as keyof typeof form] as Joi.SchemaLike,
    });

    const { error } = schemaProp.validate(data);

    if (error) {
      const errorDetails = { [name]: error.details[0].message };
      setErrors({ ...errors, ...errorDetails });
    } else {
      const errorDetails = { [name]: "" };
      setErrors({ ...errors, ...errorDetails });
    }

    setState(element.target.value);
  };

  const validate = (formData: CreatePost) => {
    const schema = Joi.object({ ...form });
    const { error } = schema.validate(formData);
    if (error) {
      const errorDetails = {} as errorDetails;
      for (let item of error.details) {
        if (item.context?.key) errorDetails[item.context?.key] = item.message;
      }
      setErrors({ ...errors, ...errorDetails });
      return false;
    }
    return true;
  };

  const handleSaveDraft = async () => {
    try {
      setIsProcessing(true);
      const formData: CreatePost = {
        title,
        subTitle,
        description,
        isPublished: false,
      };
      const isValid = validate(formData);

      if (isValid) {
        const post = await createPost(formData);
        console.log(post);
        toast.success("Post published successfully!");
        navigate(`/posts/${post._id}`, { replace: true });
      }
      setIsProcessing(false);
    } catch {
      setIsProcessing(false);
    }
  };
  return (
    <div className="px-6 py-8">
      <div className="container flex justify-between mx-auto">
        <div className="w-full lg:w-8/12">
          <h1 className="text-xl font-bold text-gray-700 md:text-2xl">
            New Post
          </h1>
          <div className="mt-6">
            <div className="max-w-4xl px-10 py-6 mx-auto bg-white rounded-lg shadow-md">
              <h5 className="text-lg font-bold text-gray-700 md:text-xl">
                Title
              </h5>
              <input
                type="text"
                name="title"
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:border-tealprimary-400 focus:ring focus:ring-tealprimary focus:border-tealprimary-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                placeholder="Enter a title here..."
                autoFocus={true}
                value={title}
                onChange={(e) => handleChange(e, setTitle)}
                autoComplete="false"
                min={3}
                max={100}
              />
              <div className="text-sm text-red-500 mt-1">
                {errors.title ?? errors.title}
              </div>
              <div className="mt-6 -mb-2">
                <h5 className="text-lg font-bold text-gray-700 md:text-xl">
                  Subtile
                </h5>
                <textarea
                  className="w-full resize-none px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:border-tealprimary-400 focus:ring focus:ring-tealprimary focus:border-tealprimary-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  name="subTitle"
                  placeholder="Enter a subtitle here..."
                  autoComplete="false"
                  value={subTitle}
                  onChange={(e) => handleChange(e, setSubTitle)}
                  minLength={3}
                  maxLength={100}
                  rows={3}
                />
                <div className="text-sm text-red-500 mt-1">
                  {errors.subTitle ?? errors.subTitle}
                </div>
              </div>
              <div className="mt-6">
                <h5 className="text-lg font-bold text-gray-700 md:text-xl">
                  Description
                </h5>
                <textarea
                  className="w-full h-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:border-tealprimary-400 focus:ring focus:ring-tealprimary focus:border-tealprimary-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  placeholder="Enter a description here..."
                  name="description"
                  autoComplete="false"
                  minLength={3}
                  value={description}
                  onChange={(e) => handleChange(e, setDescription)}
                  maxLength={500}
                  rows={10}
                />
                <div className="text-sm text-red-500 mt-1">
                  {errors.description ?? errors.description}
                </div>
              </div>
              <div className="mt-6 flex flex-row justify-end">
                <button
                  type="button"
                  className={`px-6 py-4 mx-2 flex justify-center items-center text-white bg-gray-500 rounded-md focus:outline-none ${
                    isProcessing ?? "cursor-not-allowed"
                  }`}
                  onClick={handleSaveDraft}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <Spinner className="text-white h-5 w-5 " />
                  ) : null}
                  Save as draft
                </button>
                <button
                  type="button"
                  className={`px-6 py-4 flex justify-center items-center text-white bg-tealsecondary rounded-md focus:outline-none ${
                    isProcessing ?? "cursor-not-allowed"
                  }`}
                  onClick={handleSaveDraft}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <Spinner className="text-white h-5 w-5" />
                  ) : null}
                  Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPost;

type errorDetails = {
  [x: string]: string;
};