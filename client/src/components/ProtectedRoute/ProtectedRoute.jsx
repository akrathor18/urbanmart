import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "react-toastify";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { status } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    if (status === "guest") {
      toast.info("Please sign in to access this page");
    }
  }, [status]);

  if (status === "idle" || status === "loading") {
    return null; // or loader
  }

  if (status !== "authenticated") {
    return (
      <Navigate
        to="/signin"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
