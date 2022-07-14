import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RootState } from "../src/types/store.types";
import { setUser } from "./store/auth.store";
import { UserData } from "./types/auth.types";
import { getJwt, parseJwt } from "./utilities";
import Layout from "./components/Layout";
import Signup from "./screens/Signup";
import Explore from "./screens/Explore";
import Login from "./screens/Login";
import NewPost from "./screens/NewPost";
import Post from "./screens/Post";
import EditPost from "./screens/EditPost";
import Home from "./screens/Home";

toast.configure({ position: "top-right" });

function App() {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedInUser = useCallback(() => {
    const token = getJwt();
    if (token) {
      const userData = parseJwt(token) as UserData;
      dispatch(setUser({ userData }));
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!user.fullName) loggedInUser();
  }, [user, loggedInUser]);

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/explore" element={<Explore />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/posts/new" element={<NewPost />} />
          <Route path="/posts/edit/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<Post />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
