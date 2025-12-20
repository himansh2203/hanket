import Navbar from "../component/Navbar";
import MobileBottomNav from "../component/MobileBottomNav";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <MobileBottomNav />
    </>
  );
};

export default Layout;
