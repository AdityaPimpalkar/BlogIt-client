import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Signup from "./screens/Signup";
import Posts from "./screens/Posts";
import Login from "./screens/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { setUser } from "./store/auth.store";
import { UserData } from "./types/auth.types";
import { parseJwt } from "./utilities";
import Main from "./components/Layout";

toast.configure({ position: "top-right" });

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedInUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = parseJwt(token) as UserData;
      dispatch(setUser({ userData }));
      navigate("/posts", { replace: true });
    } else navigate("/login", { replace: true });
  };

  useEffect(() => {
    loggedInUser();
  }, [loggedInUser]);

  return (
    <>
      <Routes>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route element={<Main />}>
          <Route path="posts" element={<Posts />}></Route>
          <Route path="new" element={<div className="h1">Hello!</div>} />
          <Route element={<Footer />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
