import { useState } from "react";
import { User } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import { useAuthStore } from "@/store/useAuthStore";
/* ---------------- MOCK DATA ---------------- */
const MOCK_USER = {
  name: "Demo User",
  email: "demo@urbanmart.com",
};

export default function Account() {
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({});

  const {user}= useAuthStore()
  if (!MOCK_USER) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-md w-full text-center">
          <User className="h-10 w-10 text-blue-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Welcome to Shophub</h1>
          <p className="text-gray-600 mb-6">Sign in to access your account</p>

          <Link
            to="/signin"
            className="block bg-blue-600 text-white py-3 rounded-lg mb-3"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="block border border-gray-300 py-3 rounded-lg"
          >
            Create Account
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 text-green-700">
            {success}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <Sidebar user={user|| MOCK_USER} />

          {/* Content */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-sm p-6">
            <Outlet context={{ errors, setErrors, success, setSuccess }} />
          </div>
        </div>
      </div>
    </div>
  );
}
