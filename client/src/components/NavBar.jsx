import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, Search, Menu, X, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
export default function Navbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { cart, isCartOpen, setIsCartOpen } = useCartStore();
  const { status } = useAuthStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSearch = () => {
    if (!search.trim()) return;

    navigate(`/products?search=${encodeURIComponent(search)}`);
    setIsSearchOpen(false); // close desktop search
    setMobileOpen(false); // close mobile sheet
  };

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
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
          isScrolled
            ? "shadow-lg border-b border-neutral-200"
            : "border-b border-neutral-100"
        }`}
        style={{ fontFamily: "'Archivo', sans-serif" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-16 lg:h-20">
            {/* LEFT: MOBILE MENU */}
            <div className="lg:hidden">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileOpen(true)}
                  >
                    <Menu className="h-6 w-6 text-neutral-700" />
                  </Button>
                </SheetTrigger>

                <SheetContent side="right" className="w-80 p-6 pt-12">
                  {/* Mobile Search */}
                  <div className="mb-6">
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleSearch}
                        className={"absolute top-1 left-1 z-10"}
                      >
                        <Search className="h-5 w-5" />
                      </Button>
                      <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSearch();
                        }}
                        placeholder="Search products..."
                        className="pl-10 h-11"
                      />
                    </div>
                  </div>

                  {/* Mobile Nav */}
                  <nav className="flex flex-col gap-2">
                    {navLinks.map((link) => (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                          `px-4 py-3 rounded-md text-sm font-semibold uppercase tracking-wide transition ${
                            isActive
                              ? "bg-neutral-900 text-white"
                              : "text-neutral-700 hover:bg-neutral-100"
                          }`
                        }
                      >
                        {link.label}
                      </NavLink>
                    ))}

                    <NavLink
                      to="/wishlist"
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-3 rounded-md text-sm font-semibold uppercase text-neutral-700 hover:bg-neutral-100"
                    >
                      Wishlist
                    </NavLink>

                    <NavLink
                      to={status === "authenticated" ? "/account" : "/signin"}
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-3 rounded-md text-sm font-semibold uppercase text-neutral-700 hover:bg-neutral-100"
                    >
                      My Account
                    </NavLink>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            {/* LOGO */}
            <Link
              to="/"
              className="text-2xl lg:text-3xl font-black uppercase tracking-tight lg:mr-10"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Urban
              <span className="text-blue-600 relative">
                Mart
                <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-blue-600" />
              </span>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex flex-1 justify-center gap-6 text-sm font-semibold uppercase tracking-wider">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `pb-1 transition ${
                      isActive
                        ? "border-b-2 border-neutral-900 text-neutral-900"
                        : "text-neutral-600 hover:text-neutral-900"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* ACTIONS */}
            <div className="ml-auto flex items-center gap-3">
              {/* Search (desktop) */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hidden md:flex"
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Wishlist */}
              <NavLink to="/wishlist" className="hidden lg:block">
                {({ isActive }) => (
                  <Button
                    variant="ghost"
                    size="icon"
                    className={isActive ? "bg-neutral-100" : ""}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isActive
                          ? "fill-red-500 text-red-500"
                          : "text-neutral-700"
                      }`}
                    />
                  </Button>
                )}
              </NavLink>

              {/* User */}
              <NavLink
                to={status === "authenticated" ? "/account" : "/signin"}
                className="hidden lg:block"
              >
                {({ isActive }) => (
                  <Button
                    variant="ghost"
                    size="icon"
                    className={isActive ? "bg-neutral-100" : ""}
                  >
                    <User2 className="h-5 w-5 text-neutral-700" />
                  </Button>
                )}
              </NavLink>

              {/* Cart */}

              <Button
                onClick={() => setIsCartOpen(!isCartOpen)}
                variant="ghost"
                size="icon"
                className={`relative bg-neutral-100`}
              >
                <ShoppingCart className="h-5 w-5 text-neutral-700" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* DESKTOP SEARCH BAR */}
          <div
            className={`hidden md:block overflow-hidden transition-all duration-300 ${
              isSearchOpen ? "max-h-20 pb-4 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                placeholder="Search products, brands, categories..."
                className="pl-12 pr-12 h-12 bg-neutral-50 border-neutral-200 rounded-full"
                autoFocus={isSearchOpen}
              />

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-16 lg:h-20 md:h-[5.5rem]" />
    </>
  );
}
