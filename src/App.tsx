import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RootState } from "../src/types/store.types";
import Signup from "./screens/Signup";
import Posts from "./screens/Posts";
import Login from "./screens/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { setUser } from "./store/auth.store";
import { UserData } from "./types/auth.types";
import { getJwt, parseJwt } from "./utilities";
import Main from "./components/Layout";
import NewPost from "./screens/NewPost";

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
      navigate("/posts", { replace: true });
    } else navigate("/login", { replace: true });
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!user.fullName) loggedInUser();
  }, [user, loggedInUser]);

  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Main />}>
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/new" element={<NewPost />} />
      </Route>
    </Routes>
  );
}

export default App;
