import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.min.css";
import Signup from "./screens/Signup";
import Posts from "./screens/Posts";

toast.configure({ position: "top-right" });

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="signup" element={<Signup />} />
        <Route path="posts" element={<Posts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
