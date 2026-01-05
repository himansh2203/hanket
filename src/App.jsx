import React, { Suspense, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./page/Home";
import About from "./page/About";
import Contact from "./page/Contact";
import Footer from "./component/Footer";
import Header from "./component/Header";
import Login from "./page/Login";
import SignUp from "./page/SignUp";
import Services from "./page/Services";
import Products from "./page/Products";
import FAQ from "./page/FAQ";
import HelpCenter from "./page/HelpCenter";
import OrderTracking from "./page/OrderTracking";
import ShippingInfo from "./page/ShippingInfo";
import Profile from "./page/Profile";
import Cart from "./page/Cart";
import ProductDesc from "./page/ProductDesc";
import ForgotPassword from "./page/ForgetPassword";
import Favourite from "./page/Favourite";
import Checkout from "./page/Checkout";

import Layout from "./component/Layout";

// 🔥 ADMIN IMPORTS
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import AdminProducts from "./admin/Products";

import { AuthProvider, AuthContext } from "./context/AuthContext";
import Order from "./page/Order";

// ---------------- PROTECTED ROUTES ----------------
const UserProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
};

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // JWT
  return token ? children : <Navigate to="/login" replace />;
};

// -------------------------------------------------

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<div className="page-loader">Loading...</div>}>
          <Routes>
            {/* ================= USER SITE ================= */}
            <Route
              path="/*"
              element={
                <>
                  <Layout />
                  {/* <Header /> */}

                  <Routes>
                    {/* PUBLIC */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/help" element={<HelpCenter />} />
                    <Route path="/order-tracking" element={<OrderTracking />} />
                    <Route path="/shipping-info" element={<ShippingInfo />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/product/:id" element={<ProductDesc />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassword />}
                    />
                    <Route path="/favourite" element={<Favourite />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order" element={<Order />} />

                    {/* USER PROTECTED */}
                    <Route
                      path="/profile"
                      element={
                        <UserProtectedRoute>
                          <Profile />
                        </UserProtectedRoute>
                      }
                    />

                    {/* 404 */}
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>

                  <Footer />
                </>
              }
            />

            {/* ================= ADMIN PANEL ================= */}
            <Route
              path="/admin"
              element={
                <AdminProtectedRoute>
                  <AdminLayout />
                </AdminProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="products" element={<AdminProducts />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
};

export default App;
