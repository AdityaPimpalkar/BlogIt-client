import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyDrafts } from "../services/posts.service";
import { Post } from "../types/posts.types";
import { convertToPlain } from "../utilities";

const MyDrafts = () => {
  const [myDrafts, setMyDrafts] = useState<Post[]>([]);
  const navigate = useNavigate();

  const loadMyDrafts = async () => {
    try {
      const drafts = await getMyDrafts();
      setMyDrafts([...drafts]);
    } catch (error) {
      navigate("/not-found", { replace: true });
    }
  };

  useEffect(() => {
    loadMyDrafts();
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-row">
        <div className="px-7 py-4 w-3/4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-700 md:text-2xl">
              My drafts
            </h1>
          </div>
          {myDrafts.map(({ _id, title, description, publishedOn }, index) => (
            <div className="mt-6" key={index}>
              <div className="w-full px-10 py-6  bg-white rounded-lg shadow-md hover:shadow-xl">
                <button
                  className="text-2xl font-bold text-gray-700 hover:underline"
                  onClick={() => navigate(`/posts/${_id}`)}
                >
                  {title}
                </button>
                <p className="mt-2 text-gray-600 overflow-hidden line-clamp-3">
                  {convertToPlain(description).replace(/(\r\n|\n|\r)/gm, "")}
                </p>
                <div className="flex items-center justify-end"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden w-1/4 bg-white lg:block min-h-screen border border-white border-l-gray-300 right-0 sticky"></div>
      </div>
    </div>
  );
};

export default MyDrafts;
