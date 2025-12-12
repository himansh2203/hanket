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

import { AuthProvider, AuthContext } from "./context/AuthContext";

// ------------------- PROTECTED ROUTE -------------------
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
};
// --------------------------------------------------------

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Header />

        <Suspense fallback={<div className="page-loader">Loading...</div>}>
          <Routes>
            {/* --------- PUBLIC ROUTES -------- */}
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
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* --------- PROTECTED ROUTE -------- */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* --------- 404 HANDLER -------- */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>

        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;
