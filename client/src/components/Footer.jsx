import { Link } from "react-router-dom";
import { 
  Clock, 
  Phone, 
  Mail, 
  ShoppingBag,
  Heart,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-300 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link to="/" className="inline-block group">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  Urban
                  <span className="relative inline-block ml-1">
                    <span className="text-blue-500">Mart</span>
                    <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full group-hover:h-1.5 transition-all"></span>
                  </span>
                </h2>
              </Link>
              <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed max-w-sm">
                Your trusted partner for quality products, lightning-fast delivery, 
                and secure shopping experiences.
              </p>
              
             
            </div>

            {/* Shop Column */}
            <div>
              <h3 className="text-white font-bold mb-5 flex items-center gap-2 text-sm sm:text-base">
                <ShoppingBag className="w-4 h-4 text-blue-500" />
                Shop
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link 
                    to="/products" 
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-white hover:translate-x-1 transition-all group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    All Products
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/categories" 
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-white hover:translate-x-1 transition-all group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    Categories
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/wishlist" 
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-white hover:translate-x-1 transition-all group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/cart" 
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-white hover:translate-x-1 transition-all group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    Cart
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-white font-bold mb-5 text-sm sm:text-base">
                Company
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link 
                    to="/about" 
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-white hover:translate-x-1 transition-all group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-white hover:translate-x-1 transition-all group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    Contact
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/privacy" 
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-white hover:translate-x-1 transition-all group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/terms" 
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-white hover:translate-x-1 transition-all group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Column */}
            <div>
              <h3 className="text-white font-bold mb-5 text-sm sm:text-base">
                Get in Touch
              </h3>
              <ul className="space-y-4 text-sm">
                <li>
                  <a 
                    href="mailto:support@urbanmart.com"
                    className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors group"
                  >
                    <div className="w-9 h-9 bg-slate-800/50 border border-slate-700 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/20 group-hover:border-blue-600 transition-all">
                      <Mail className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="pt-1.5">
                      <p className="font-medium text-slate-300 mb-0.5 text-xs">Email</p>
                      <p className="text-xs sm:text-sm">support@urbanmart.com</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a 
                    href="tel:+919876543210"
                    className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors group"
                  >
                    <div className="w-9 h-9 bg-slate-800/50 border border-slate-700 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/20 group-hover:border-blue-600 transition-all">
                      <Phone className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="pt-1.5">
                      <p className="font-medium text-slate-300 mb-0.5 text-xs">Phone</p>
                      <p className="text-xs sm:text-sm">+91 98765 43210</p>
                    </div>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-slate-400">
                  <div className="w-9 h-9 bg-slate-800/50 border border-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="pt-1.5">
                    <p className="font-medium text-slate-300 mb-0.5 text-xs">Hours</p>
                    <p className="text-xs sm:text-sm">Mon – Sat, 9AM – 6PM</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <p className="text-slate-400 text-center sm:text-left">
              © {currentYear} UrbanMart. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <p className="text-slate-400 flex items-center gap-2">
                Built with 
                <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                using React & Tailwind
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}