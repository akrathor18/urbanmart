import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

const PublicRoute = () => {
  const { status } = useAuthStore();

  // ⏳ Wait until auth check finishes
  if (status === "idle" || status === "loading") {
    return null; // or loader
  }

  // ✅ If already logged in → go to account
  if (status === "authenticated") {
    return <Navigate to="/account" replace />;
  }

  // ❌ Not logged in → allow access (signin/signup)
  return <Outlet />;
};

export default PublicRoute;
