import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  User,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import { validationRules } from "@/utils/validation.js";
import { useAuthStore } from "@/store/useAuthStore";

export default function Signup() {
  const { signUp, isSigning, status } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/account";

useEffect(() => {
    if (status === "authenticated") {
      navigate("/account", { replace: true });
    }
  }, [status, navigate]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const password = watch("password");

  /* ---------------- SUBMIT ---------------- */
  const onSubmit = async (data) => {
    const success = signUp(data);
    if (success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-md mx-auto px-4">
        {/* Back */}
        <Link
          to="/signin"
          className="inline-flex items-center text-blue-600 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Sign In
        </Link>

        <div className="bg-white rounded-xl shadow-sm p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-7 w-7 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold">Create Your Account</h1>
            <p className="text-gray-600">Join UrbanMart and start shopping</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Names */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  placeholder="First Name"
                  {...register("firstName", validationRules.firstName)}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  placeholder="Last Name"
                  {...register("lastName", validationRules.lastName)}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                {...register("email", validationRules.email)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", validationRules.password)}
                className="w-full pl-10 pr-10 py-2 border rounded-lg"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                {...register(
                  "confirmPassword",
                  validationRules.confirmPassword(password),
                )}
                className="w-full pl-10 pr-10 py-2 border rounded-lg"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.root && (
              <div className="bg-red-50 p-3 rounded text-red-600 text-sm">
                {errors.root.message}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={!isValid || isSigning}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold disabled:bg-blue-400"
            >
              {isSigning ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-600 font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
