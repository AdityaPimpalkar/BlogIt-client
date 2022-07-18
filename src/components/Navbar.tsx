import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import { setNavigation } from "../store/navigation.store";
import { logoutUser } from "../store/auth.store";
import { RootState } from "../types/store.types";
import { removeJwt } from "../utilities";

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
    <nav className="px-6 py-4 w-32 flex flex-row min-h-screen bg-white shadow sticky justify-center">
      <div className="flex flex-col h-full fixed">
        <div>
          <a
            href="/"
            className="text-xl font-bold text-tealsecondary md:text-2xl"
          >
            blogit
          </a>
        </div>
        <div className="grid grid-row-5 mb-8 grid-flow-row gap-10 justify-center h-full items-center">
          <div className="flex justify-center items-center w-10 h-10">
            {nav.home ? (
              <MdHome className="cursor-pointer mx-auto w-10 h-10 text-tealsecondary" />
            ) : (
              <MdOutlineHome
                className="cursor-pointer mx-auto w-7 h-7"
                onClick={() => {
                  if (user._id) {
                    dispatch(setNavigation({ nav: "home" }));
                    navigate("/");
                  } else navigate("/login");
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
                  navigate("/explore");
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
                onClick={() => {
                  if (user._id) {
                    dispatch(setNavigation({ nav: "newPost" }));
                    navigate("/posts/new");
                  } else navigate("/login");
                }}
              />
            )}
          </div>
          <div className="flex justify-center items-center w-10 h-10">
            {nav.bookmarks ? (
              <BookmarkSolidIcon className="cursor-pointer mx-auto w-10 h-10 text-tealsecondary" />
            ) : (
              <BookmarkIcon
                className="cursor-pointer mx-auto w-7 h-7"
                onClick={() => {
                  if (user._id) {
                    dispatch(setNavigation({ nav: "bookmarks" }));
                    navigate("/bookmarks");
                  } else navigate("/login");
                }}
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
