import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { PencilIcon, UserCircleIcon } from "@heroicons/react/solid";
import { LogoutIcon, BookmarkIcon } from "@heroicons/react/outline";
import {
  MdOutlineExplore,
  MdExplore,
  MdOutlineHome,
  MdHome,
} from "react-icons/md";
import { RootState } from "../types/store.types";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../store/auth.store";
import { removeJwt } from "../utilities";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
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
        <div className="grid grid-row-5 grid-flow-row gap-4 justify-center h-full items-center">
          <MdOutlineHome className="w-7 h-7 cursor-pointer" />
          <MdOutlineExplore className="w-7 h-7 cursor-pointer" />
          <BookmarkIcon className="w-7 h-7 cursor-pointer" />
          <Link to="/posts/new">
            <PencilIcon className="w-7 h-7 text-tealsecondary cursor-pointer" />
          </Link>
          {user?.avatar ? (
            <img
              src={user?.avatar}
              alt="avatar"
              className="hidden object-cover w-7 h-7 rounded-full sm:block"
            />
          ) : (
            <UserCircleIcon className="w-7 h-7" />
          )}
          {user.fullName && (
            <LogoutIcon className="h-7 w-7 cursor-pointer" onClick={logout} />
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
