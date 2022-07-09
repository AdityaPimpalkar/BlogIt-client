import React from "react";
import { Route, Routes, BrowserRouter, Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Posts from "../screens/Posts";

type Props = {
  children: React.ReactNode;
};

const Main = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
