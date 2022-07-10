import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { LogoutIcon } from "@heroicons/react/outline";
import { RootState } from "../types/store.types";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../store/auth.store";
import { removeJwt } from "../utilities";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const logout = () => {
    dispatch(logoutUser());
    removeJwt();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="px-6 py-4 bg-white shadow">
      <div className="container flex flex-col mx-auto md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between">
          <div>
            <a
              href="/posts"
              className="text-xl font-bold text-gray-800 md:text-2xl"
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
        </div>
        <div className="flex-col hidden md:flex md:flex-row md:-mx-4">
          <div className="flex items-center cursor-pointer">
            <Link to="/posts/new">
              <PlusCircleIcon className="h-10 w-10 mx-4 text-tealsecondary" />
            </Link>
            <img
              src={user?.avatar}
              alt="avatar"
              className="hidden object-cover w-10 h-10 mr-2 rounded-full sm:block"
            />
            <h1 className="font-bold text-gray-700 hover:underline">
              {user.fullName}
            </h1>
            <LogoutIcon className="h-8 w-8 mx-4" onClick={logout} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
