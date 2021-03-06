import React, { useCallback, useEffect, useState } from "react";
import PostsCard from "../components/PostsCard";
import { getBookmarks } from "../services/bookmarks.service";
import BookmarksProps from "../types/bookmarks.types";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState<BookmarksProps[]>([]);

  const loadBookmarks = useCallback(async () => {
    try {
      const loadedBookmarks = await getBookmarks();
      setBookmarks([...loadedBookmarks]);
    } catch (error) {}
  }, []);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const bookmarkRemoved = (id: string) => {
    const udpatedBookmarks = bookmarks.filter(
      ({ _id: bookmarkId }) => bookmarkId !== id
    );
    setBookmarks([...udpatedBookmarks]);
  };

  return (
    <div className="w-full">
      <div className="flex flex-row">
        <div className="px-7 py-4 w-3/4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-700 md:text-2xl">
              Bookmarks
            </h1>
          </div>
          {bookmarks.map(({ post, _id }, index) => (
            <PostsCard
              key={index}
              id={post._id}
              title={post.title}
              description={post.description}
              publishedOn={post.publishedOn}
              bookmarkId={_id}
              bookmarked={true}
              isFollowing={post.isFollowing}
              bookmarkRemoved={bookmarkRemoved}
              createdBy={post.createdBy}
            />
          ))}
        </div>
        <div className="hidden w-1/4 bg-white lg:block min-h-screen border border-white border-l-gray-300 right-0 sticky"></div>
      </div>
    </div>
  );
};

export default Bookmarks;
