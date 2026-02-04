import { User, Package, LogOut, Settings } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar({ user }) {
  const navLinks = [
    { to: "./profile", label: "Profile", icon: User },
    { to: "./orders", label: "Orders", icon: Package },
    { to: "./settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
        <div className="text-center mb-6">
          <div className="bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3">
            <User className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
          </div>
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">
            {user.name}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">{user.email}</p>
        </div>

        <nav className="space-y-2">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base ${
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{label}</span>
            </NavLink>
          ))}
          <button
            // onClick={logout}
            className="w-full flex items-center px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors text-sm sm:text-base"
          >
            <LogOut className="h-4 w-4 sm:h-5 sm:w-5 mr-3" />
            Sign Out
          </button>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
