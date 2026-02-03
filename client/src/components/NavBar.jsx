import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Heart, Search, Menu, X, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCartStore } from "@/store/useCartStore";

export default function Navbar() {
  const {cart} = useCartStore()
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/cart", label: "Cart" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
          isScrolled
            ? "shadow-lg border-b border-neutral-200"
            : "border-b border-neutral-100"
        }`}
        style={{ fontFamily: "'Archivo', sans-serif" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="text-2xl lg:text-3xl font-black tracking-tight uppercase transition-all duration-200 hover:scale-105"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Urban
              <span className="text-blue-600 relative">
                Mart
                <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-blue-600"></span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold uppercase tracking-wider">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-sm transition-all duration-200 ${
                      isActive
                        ? "bg-neutral-900 text-white"
                        : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search Toggle (Desktop) */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hidden md:flex hover:bg-neutral-100 transition-colors"
              >
                <Search className="h-5 w-5 text-neutral-700" />
              </Button>

              {/* Wishlist */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex hover:bg-neutral-100 transition-all duration-200 group"
              >
                <Heart className="h-5 w-5 text-neutral-700 group-hover:fill-red-500 group-hover:text-red-500 transition-all" />
              </Button>

              {/* user */}
              <Link to="/signin">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-neutral-100 transition-colors group"
                >
              <User2 className="h-5 w-5 text-neutral-700 group-hover:scale-110 transition-transform"/>
                </Button>
              </Link>

              {/* Cart */}
              <Link to="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-neutral-100 transition-colors group"
                >
                  <ShoppingCart className="h-5 w-5 text-neutral-700 group-hover:scale-110 transition-transform" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white animate-pulse">
                      {cart.length}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden hover:bg-neutral-100"
                  >
                    <Menu className="h-6 w-6 text-neutral-700" />
                  </Button>
                </SheetTrigger>

                <SheetContent side="right" className="w-80 p-6 pt-12">
                  {/* Mobile Search */}
                  <div className="mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                      <Input
                        placeholder="Search products..."
                        className="pl-10 h-11 bg-neutral-50 border-neutral-200"
                      />
                    </div>
                  </div>

                  {/* Mobile Nav Links */}
                  <nav className="flex flex-col gap-2 mb-6">
                    {navLinks.map((link) => (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-3 rounded-md text-sm font-semibold uppercase tracking-wide transition-all ${
                            isActive
                              ? "bg-neutral-900 text-white"
                              : "text-neutral-700 hover:bg-neutral-100"
                          }`
                        }
                      >
                        {link.icon}
                        {link.label}
                      </NavLink>
                    ))}
                  </nav>

                  {/* CTA */}
                  <div className="pt-6 border-t border-neutral-200">
                    <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-wider">
                      Sign In
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Desktop Search Bar (Expandable) */}
          <div
            className={`hidden md:block overflow-hidden transition-all duration-300 ease-out ${
              isSearchOpen ? "max-h-20 pb-4 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <Input
                placeholder="Search for products, brands, categories..."
                className="pl-12 pr-12 h-12 bg-neutral-50 border-neutral-200 rounded-full text-sm focus-visible:ring-2 focus-visible:ring-blue-600"
                autoFocus={isSearchOpen}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-neutral-200 rounded-full"
              >
                <X className="h-4 w-4 text-neutral-500" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden border-t border-neutral-100 p-4 py-3 bg-neutral-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              placeholder="Search..."
              className="pl-10 h-10 bg-white border-neutral-200 rounded-full text-sm"
            />
          </div>
        </div>
      </header>

      {/* Spacer to prevent content jump */}
      <div className="h-16 lg:h-20 md:h-[5.5rem]"></div>
    </>
  );
}
