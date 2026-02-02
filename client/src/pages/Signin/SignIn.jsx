import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { validationRules } from "@/utils/validation.js";
import { useAuthStore } from "@/store/useAuthStore";
/* ---------------- DEMO CREDENTIALS ---------------- */
const DEMO_CREDENTIALS = {
  email: "demo@UrbanMart.com",
  password: "demo123",
};

export default function Signin() {
    const {signIn, isSigning} = useAuthStore()
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /* ---------------- NORMAL LOGIN ---------------- */
  const onSubmit = async (data) => {
    try {
        signIn(data)
     
    } catch (err) {
      setError("root", { message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------------- DEMO LOGIN ---------------- */
  const handleDemoLogin = async () => {
    setValue("email", DEMO_CREDENTIALS.email);
    setValue("password", DEMO_CREDENTIALS.password);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-md mx-auto px-4">
        {/* Back */}
        <Link to="/" className="inline-flex items-center text-blue-600 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="bg-white rounded-xl shadow-sm p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-7 w-7 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {/* Demo Login */}
          <button
            onClick={handleDemoLogin}
            disabled={isLoading}
            className="w-full mb-6 p-3 border border-blue-200 rounded-lg bg-blue-50 hover:bg-blue-100 transition text-left"
          >
                        <p className="text-xs sm:text-sm text-blue-800 font-medium mb-2">Quick Demo Login:</p>

            <div className="font-medium text-gray-900">Demo User</div>
            <div className="text-sm text-gray-600">
              demo@UrbanMart.com · demo123
            </div>
          </button>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  {...register("email", validationRules.email)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", validationRules.password)}
                  className="w-full pl-10 pr-10 py-2 border rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Error */}
            {errors.root && (
              <div className="bg-red-50 p-3 rounded text-red-600 text-sm">
                {errors.root.message}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold disabled:bg-blue-400"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Signup */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
