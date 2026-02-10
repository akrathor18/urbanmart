import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { 
  ShoppingCart, 
  Heart, 
  Search, 
  Menu, 
  X, 
  User2,
  ShoppingBag,
  LogIn,
  UserCircle,
  TrendingUp
} from "lucide-react";
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

  const cartItemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/products?search=${encodeURIComponent(search)}`);
    setIsSearchOpen(false);
    setMobileOpen(false);
    setSearch("");
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home", icon: null },
    { to: "/products", label: "Products", icon: ShoppingBag },
    { to: "/cart", label: "Cart", icon: ShoppingCart },
  ];

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-slate-200"
            : "bg-white border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* LEFT: MOBILE MENU + LOGO */}
            <div className="flex items-center gap-3 lg:gap-6">
              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-slate-100 rounded-xl"
                    >
                      <Menu className="h-6 w-6 text-slate-700" />
                    </Button>
                  </SheetTrigger>

                  <SheetContent side="right" className="w-80 p-0">
                    {/* Mobile Sheet Header */}
                    <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-slate-900">Menu</h2>
                      </div>

                      {/* Mobile Search */}
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSearch();
                          }}
                          placeholder="Search products..."
                          className="pl-10 pr-4 h-11 bg-white border-slate-200 rounded-xl focus-visible:ring-slate-900"
                        />
                        {search && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleSearch}
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg"
                          >
                            <Search className="h-4 w-4 text-blue-600" />
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Mobile Navigation */}
                    <nav className="p-4 space-y-2">
                      {navLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                          <NavLink
                            key={link.to}
                            to={link.to}
                            onClick={() => setMobileOpen(false)}
                            className={({ isActive }) =>
                              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                                isActive
                                  ? "bg-slate-900 text-white shadow-lg"
                                  : "text-slate-700 hover:bg-slate-100"
                              }`
                            }
                          >
                            {Icon && <Icon className="h-5 w-5" />}
                            {link.label}
                          </NavLink>
                        );
                      })}

                      <NavLink
                        to="/wishlist"
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                            isActive
                              ? "bg-slate-900 text-white shadow-lg"
                              : "text-slate-700 hover:bg-slate-100"
                          }`
                        }
                      >
                        <Heart className="h-5 w-5" />
                        Wishlist
                      </NavLink>

                      <div className="pt-4 mt-4 border-t border-slate-200">
                        <NavLink
                          to={status === "authenticated" ? "/account" : "/signin"}
                          onClick={() => setMobileOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                              isActive
                                ? "bg-blue-600 text-white shadow-lg"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`
                          }
                        >
                          {status === "authenticated" ? (
                            <>
                              <UserCircle className="h-5 w-5" />
                              My Account
                            </>
                          ) : (
                            <>
                              <LogIn className="h-5 w-5" />
                              Sign In
                            </>
                          )}
                        </NavLink>
                      </div>
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>

              {/* LOGO */}
              <Link
                to="/"
                className="flex items-center gap-2 group"
              >
                <div className="text-2xl lg:text-3xl font-black uppercase tracking-tight">
                  <span className="text-slate-900">Urban</span>
                  <span className="relative inline-block ml-1">
                    <span className="text-blue-600">Mart</span>
                    <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full group-hover:h-1.5 transition-all" />
                  </span>
                </div>
              </Link>
            </div>

            {/* CENTER: DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-xl text-sm font-semibold uppercase tracking-wide transition-all ${
                      isActive
                        ? "bg-slate-900 text-white shadow-lg"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* RIGHT: ACTIONS */}
            <div className="flex items-center gap-2">
              {/* Search Button (Desktop) */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`hidden md:flex rounded-xl hover:bg-slate-100 transition-all ${
                  isSearchOpen ? "bg-slate-100" : ""
                }`}
              >
                <Search className="h-5 w-5 text-slate-700" />
              </Button>

              {/* Wishlist (Desktop) */}
              <NavLink to="/wishlist" className="hidden lg:block">
                {({ isActive }) => (
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-xl hover:bg-slate-100 transition-all relative ${
                      isActive ? "bg-slate-100" : ""
                    }`}
                  >
                    <Heart
                      className={`h-5 w-5 transition-all ${
                        isActive
                          ? "fill-red-500 text-red-500"
                          : "text-slate-700"
                      }`}
                    />
                  </Button>
                )}
              </NavLink>

              {/* User Account (Desktop) */}
              <NavLink
                to={status === "authenticated" ? "/account" : "/signin"}
                className="hidden lg:block"
              >
                {({ isActive }) => (
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-xl hover:bg-slate-100 transition-all ${
                      isActive ? "bg-slate-100" : ""
                    }`}
                  >
                    {status === "authenticated" ? (
                      <UserCircle className="h-5 w-5 text-slate-700" />
                    ) : (
                      <LogIn className="h-5 w-5 text-slate-700" />
                    )}
                  </Button>
                )}
              </NavLink>

              {/* Cart */}
              <Button
                onClick={() => setIsCartOpen(!isCartOpen)}
                variant="ghost"
                size="icon"
                className="relative rounded-xl bg-slate-100 hover:bg-slate-200 transition-all"
              >
                <ShoppingCart className="h-5 w-5 text-slate-700" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shadow-lg shadow-blue-600/30 animate-in zoom-in-50">
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* DESKTOP SEARCH BAR */}
          <div
            className={`hidden md:block overflow-hidden transition-all duration-300 ${
              isSearchOpen ? "max-h-24 pb-5 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
                <div className="hidden sm:block h-5 w-px bg-slate-300" />
                <TrendingUp className="hidden sm:block h-4 w-4 text-slate-400" />
              </div>
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                placeholder="Search products, brands, categories..."
                className="pl-12 sm:pl-20 pr-24 h-12 bg-slate-50 border-slate-200 rounded-2xl focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:border-transparent text-sm shadow-sm"
                autoFocus={isSearchOpen}
              />

              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {search && (
                  <Button
                    onClick={handleSearch}
                    size="sm"
                    className="h-8 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm"
                  >
                    Search
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearch("");
                  }}
                  className="h-8 w-8 rounded-lg hover:bg-slate-200"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className={`transition-all duration-300 ${
        isSearchOpen ? "h-24 lg:h-28" : "h-16 lg:h-20"
      }`} />
    </>
  );
}