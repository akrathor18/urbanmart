import React from "react";
import { Button } from "@/components/ui/button";
import Navbar from "./components/NavBar.jsx";
import Hero from "./components/home/Hero.jsx";
import FeaturedProducts from "./components/home/FeaturedProducts.jsx";
import "./App.css";
import Categories from "./components/home/Categories.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedProducts />
      <Categories/>
      <Footer/>
    </>
  );
}

export default App;
