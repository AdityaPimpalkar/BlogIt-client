import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/solid";
import { Post } from "../types/posts.types";
import { FollowingUsers } from "../types/users.types";
import { RootState } from "../types/store.types";
import PostsCard from "../components/PostsCard";
import { getHomePosts } from "../services/posts.service";
import { followingUsers } from "../services/users.service";

const Home = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [posts, setPosts] = useState<Post[]>([]);
  const [myfollowing, setMyFollowing] = useState<FollowingUsers>({
    following: [],
  });
  const navigate = useNavigate();
  const { following } = myfollowing;

  const loadPosts = useCallback(async () => {
    try {
      const loadedPosts = await getHomePosts();
      const following = await followingUsers();
      setMyFollowing(following);
      setPosts([...loadedPosts]);
    } catch (error) {}
  }, []);

  useEffect(() => {
    if (!user.fullName) navigate("/explore", { replace: true });
    else loadPosts();
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-row">
        <div className="px-7 py-4 w-3/4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-700 md:text-2xl">
              Home
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
            return (
              <PostsCard
                key={index}
                id={post._id}
                title={post.title}
                description={post.description}
                publishedOn={post.publishedOn}
                bookmarked={bookmarked}
                isFollowing={true}
                createdBy={post.createdBy}
              />
            );
          })}
        </div>
        <div className="hidden w-1/4 bg-white lg:block min-h-screen border border-white border-l-gray-300 right-0 sticky">
          <div className="">
            <h1 className="mx-4 my-2 text-xl font-bold text-gray-700">
              Authors
            </h1>
            <div className="flex flex-col max-w-sm px-6 py-4 mx-auto">
              <ul className="-mx-4">
                {following.length > 0
                  ? following.map((user, index) => (
                      <li className="flex items-center mb-3" key={index}>
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt="avatar"
                            className="object-cover w-10 h-10 mx-4 rounded-full"
                          />
                        ) : (
                          <UserCircleIcon className="object-cover w-10 h-10 mx-4 rounded-full" />
                        )}

                        <p>
                          <a
                            href="#"
                            className="mx-1 font-bold text-gray-700 hover:underline"
                          >
                            {user.fullName}
                          </a>
                        </p>
                      </li>
                    ))
                  : null}

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
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
