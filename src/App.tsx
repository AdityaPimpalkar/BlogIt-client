import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.min.css";
import Signup from "./screens/Signup";
import Posts from "./screens/Posts";
import Login from "./screens/Login";

toast.configure({ position: "top-right" });

function App() {
  const navigate = useNavigate();
  const loggedInUser = () => {
    const token = localStorage.getItem("token");
    if (token) navigate("/posts", { replace: true });
    else navigate("/login", { replace: true });
  };

  useEffect(() => {
    loggedInUser();
  }, []);

  return (
    <Routes>
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="posts" element={<Posts />} />
    </Routes>
  );
}

export default App;
