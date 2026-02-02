import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import Home from "@/pages/Home/Home.jsx";
import ProductDetail from "@/pages/ProductDetails/ProductDetails.jsx";
import Products from "@/pages/Products/Products.jsx";
import NotFound from "./NotFound/NotFound";
export default function Pages() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        {/* <Route path="/cart" element={<Cart />} /> */}
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
