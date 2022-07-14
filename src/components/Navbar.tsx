import { useDispatch, useSelector } from "react-redux";
import {
  UserCircleIcon,
  BookmarkIcon as BookmarkSolidIcon,
  PencilIcon as PencilSolidIcon,
} from "@heroicons/react/solid";
import { LogoutIcon, BookmarkIcon, PencilIcon } from "@heroicons/react/outline";
import {
  MdOutlineExplore,
  MdExplore,
  MdOutlineHome,
  MdHome,
} from "react-icons/md";
import { RootState } from "../types/store.types";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../store/auth.store";
import { removeJwt } from "../utilities";
import { setNavigation } from "../store/navigation.store";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const nav = useSelector((state: RootState) => state.navigation);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutUser());
    removeJwt();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="px-6 py-4 w-32 flex flex-row min-h-screen bg-white shadow fixed justify-center">
      <div className="flex flex-col">
        <div>
          <a
            href="/"
            className="text-xl font-bold text-tealsecondary md:text-2xl"
          >
            blogit
          </a>
        </div>
        <div>
          <button
            type="button"
            className="block text-gray-800 hover:text-gray-600 focus:text-gray-600 focus:outline-none md:hidden"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
            </svg>
          </button>
        </div>
        <div className="grid grid-row-5 grid-flow-row gap-10 justify-center h-full items-center">
          <div className="flex justify-center items-center w-10 h-10">
            {nav.home ? (
              <MdHome className="cursor-pointer mx-auto w-10 h-10 text-tealsecondary" />
            ) : (
              <MdOutlineHome
                className="cursor-pointer mx-auto w-7 h-7"
                onClick={() => {
                  dispatch(setNavigation({ nav: "home" }));
                  navigate("/");
                }}
              />
            )}
          </div>

          <div className="flex justify-center items-center w-10 h-10">
            {nav.explore ? (
              <MdExplore className="cursor-pointer mx-auto w-10 h-10 text-tealsecondary" />
            ) : (
              <MdOutlineExplore
                className="cursor-pointer mx-auto w-7 h-7"
                onClick={() => {
                  dispatch(setNavigation({ nav: "explore" }));
                  navigate("/posts");
                }}
              />
            )}
          </div>
          <div className="flex justify-center items-center w-10 h-10">
            {nav.newPost ? (
              <PencilSolidIcon className="cursor-pointer mx-auto w-10 h-10 text-tealsecondary" />
            ) : (
              <PencilIcon
                className="cursor-pointer mx-auto w-7 h-7"
                onClick={() => dispatch(setNavigation({ nav: "newPost" }))}
              />
            )}
          </div>
          <div className="flex justify-center items-center w-10 h-10">
            {nav.bookmarks ? (
              <BookmarkSolidIcon className="cursor-pointer mx-auto w-10 h-10 text-tealsecondary" />
            ) : (
              <BookmarkIcon
                className="cursor-pointer mx-auto w-7 h-7"
                onClick={() => dispatch(setNavigation({ nav: "bookmarks" }))}
              />
            )}
          </div>
          <div className="flex justify-center items-center w-10 h-10">
            {user?.avatar ? (
              <img
                src={user?.avatar}
                alt="avatar"
                className="hidden object-cover w-10 h-10 rounded-full sm:block"
              />
            ) : (
              <UserCircleIcon
                className="w-7 h-7 cursor-pointer"
                onClick={() => navigate("/login")}
              />
            )}
          </div>
          {user.fullName && (
            <div className="flex justify-center items-center w-10 h-10">
              <LogoutIcon className="h-7 w-7 cursor-pointer" onClick={logout} />
            </div>
          )}

          {/* {user.fullName && (
          <div className="flex-row hidden md:flex md:flex-row md:-mx-4">
            <div className="flex items-center cursor-pointer">
              <Link to="/posts/new">
                <PlusCircleIcon className="h-10 w-10 mx-4 text-tealsecondary" />
              </Link>
              
              <h1 className="font-bold text-gray-700 hover:underline">
                {user.fullName}
              </h1>
              <LogoutIcon className="h-8 w-8 mx-4" onClick={logout} />
            </div>
          </div>
        )} */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
