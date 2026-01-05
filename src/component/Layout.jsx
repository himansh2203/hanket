import Navbar from "../component/Navbar";
import MobileBottomNav from "../component/MobileBottomNav";
import { Outlet } from "react-router-dom";
import Footer from "../component/Footer";

const Layout = () => {
  return (
    <div className="app-layout">
      <Navbar />

      <main className="main-content">
        <Outlet />
      </main>

      <MobileBottomNav />
      <Footer />
    </div>
  );
};

export default Layout;
