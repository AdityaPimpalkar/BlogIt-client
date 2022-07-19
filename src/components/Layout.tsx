import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="overflow-x-hidden 2xl:flex 2xl:justify-center">
      <div className="flex flex-row 2xl:container">
        <Navbar />
        <Outlet />
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
