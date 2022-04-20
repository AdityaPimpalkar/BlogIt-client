import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast } from "react-toastify";
import "./App.css";
import Signup from "./screens/Signup";

toast.configure({ position: "top-right" });

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
