import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="overflow-x-hidden flex flex-row">
      <Navbar />
      <div className="w-32"></div>
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
