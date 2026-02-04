import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import Home from "@/pages/Home/Home.jsx";
import ProductDetail from "@/pages/ProductDetails/ProductDetails.jsx";
import Products from "@/pages/Products/Products.jsx";
import NotFound from "./NotFound/NotFound";
import Signin from "./Signin/SignIn";
import SignUp from "./SignUp/SignUp";
import Account from "./Account/Account";
import Cart from "./Cart/Cart";
import Wishlist from "./Wishlist/Wishlist";
import CheckoutPage from "./CheckOut/CheckoutPage";

import Profile from "./Account/Profile/Profile";
import Orders from "./Account/Order/Orders";
import Settings from "./Account/Settings/Settings";

import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

export default function Pages() {
  const { status } = useAuthStore();
  useEffect(() => {
    useAuthStore.getState().checkAuth();
  }, []);

  if (status === "idle" || status === "loading") {
    return null; // splash screen
  }

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        {/* // Protected Routes  */}
        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<Account />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<Profile />} />
            <Route path="orders" element={<Orders />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
