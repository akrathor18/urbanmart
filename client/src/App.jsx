import React from "react";
import { Button } from "@/components/ui/button";
import Navbar from "./components/NavBar.jsx";
import Hero from "./components/Hero.jsx";
import FeaturedProducts from "./components/FeaturedProducts.jsx";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedProducts />
    </>
  );
}

export default App;
