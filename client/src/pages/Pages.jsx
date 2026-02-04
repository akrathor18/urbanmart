import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

import MainLayout from "@/layout/MainLayout";
import Home from "@/pages/Home/Home";
import Products from "@/pages/Products/Products";
import ProductDetail from "@/pages/ProductDetails/ProductDetails";
import Signin from "./Signin/SignIn";
import SignUp from "./SignUp/SignUp";
import Account from "./Account/Account";
import Cart from "./Cart/Cart";
import Wishlist from "./Wishlist/Wishlist";
import CheckoutPage from "./CheckOut/CheckoutPage";
import NotFound from "./NotFound/NotFound";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

export default function Pages() {
  const { status, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Block rendering until auth is resolved
  if (status === "loading") {
    return null; // or <SplashScreen />
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

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<Account />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
