import Joi from "joi";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import Spinner from "../icons/Spinner";
import { Post, UpdatePost } from "../types/posts.types";
import { getPostById, updatePost } from "../services/posts.service";

const EditPost = () => {
  const [postForm, setPostForm] = useState<Post>({} as Post);
  const [errors, setErrors] = useState<UpdatePost>({} as UpdatePost);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const form = {
    _id: Joi.string().required(),
    title: Joi.string().required().min(3).max(100).label("Title"),
    subTitle: Joi.string().required().min(3).max(300).label("Subtitle"),
    description: Joi.string().required().label("Description"),
    isPublished: Joi.bool().required(),
    publishedOn: Joi.number().allow(),
  };

  const loadPost = useCallback(async () => {
    try {
      if (params?.id) {
        const post = await getPostById(params.id);
        setPostForm({ ...post });
      }
    } catch (error) {
      navigate("/not-found", { replace: true });
    }
  }, []);

  useEffect(() => {
    loadPost();
  }, []);

  const handleChange = (
    element: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

    setPostForm({ ...postForm, [name]: element.target.value });
  };

  const validate = (formData: UpdatePost) => {
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

  const handleSave = async (isPublish: boolean) => {
    try {
      setIsProcessing(true);
      const { _id, title, subTitle, description, publishedOn } = postForm;
      const formData: UpdatePost = {
        _id,
        title,
        subTitle,
        description,
        isPublished: isPublish,
        publishedOn,
      };
      const isValid = validate(formData);

      if (isValid) {
        const post = await updatePost(formData);
        toast.success("Post published successfully!");
        navigate(`/posts/${post._id}`, { replace: true });
      }
      setIsProcessing(false);
    } catch {
      setIsProcessing(false);
    }
  };

  const handleUpate = async () => {
    try {
      setIsProcessing(true);
      const { _id, title, subTitle, description, isPublished } = postForm;
      const formData: UpdatePost = {
        _id,
        title,
        subTitle,
        description,
        isPublished,
      };
      const isValid = validate(formData);

      if (isValid) {
        const post = await updatePost(formData);
        toast.success("Post updated successfully!");
        navigate(`/posts/${post._id}`, { replace: true });
      }
      setIsProcessing(false);
    } catch {
      setIsProcessing(false);
    }
  };
  return (
    <div className="px-7 py-4 w-full">
      <div className="container flex justify-between mx-auto">
        <div className="w-full lg:w-3/4">
          <h1 className="text-xl font-bold text-gray-700 md:text-2xl">
            Edit Post
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
                value={postForm.title}
                onChange={handleChange}
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
                  value={postForm?.subTitle}
                  onChange={handleChange}
                  minLength={3}
                  maxLength={100}
                  rows={3}
                />
                <div className="text-sm text-red-500 mt-1">
                  {errors?.subTitle ?? errors?.subTitle}
                </div>
              </div>
              <div className="mt-6">
                <h5 className="text-lg font-bold text-gray-700 md:text-xl">
                  Description
                </h5>
                <Editor
                  value={postForm.description}
                  apiKey="inpiizzpndcy769d1ip67c2y422x52wicn1imcw5dtj8p4ds"
                  onEditorChange={(val) =>
                    setPostForm({ ...postForm, description: val })
                  }
                />
                {/* <textarea
                  className="w-full h-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:border-tealprimary-400 focus:ring focus:ring-tealprimary focus:border-tealprimary-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  placeholder="Enter a description here..."
                  name="description"
                  autoComplete="false"
                  minLength={3}
                  value={postForm.description}
                  onChange={handleChange}
                  maxLength={1000}
                  rows={10}
                /> */}
                <div className="text-sm text-red-500 mt-1">
                  {errors.description ?? errors.description}
                </div>
              </div>
              <div className="mt-6 flex flex-row justify-end">
                {postForm.isPublished ? (
                  <button
                    type="button"
                    className={`px-6 py-4 flex justify-center items-center text-white bg-tealsecondary rounded-md focus:outline-none ${
                      isProcessing ?? "cursor-not-allowed"
                    }`}
                    onClick={handleUpate}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <Spinner className="text-white h-5 w-5" />
                    ) : null}
                    Update
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className={`px-6 py-4 mx-2 flex justify-center items-center text-white bg-gray-500 rounded-md focus:outline-none ${
                        isProcessing ?? "cursor-not-allowed"
                      }`}
                      onClick={() => handleSave(false)}
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
                      onClick={() => handleSave(true)}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <Spinner className="text-white h-5 w-5" />
                      ) : null}
                      Publish
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;

type errorDetails = {
  [x: string]: string;
};
