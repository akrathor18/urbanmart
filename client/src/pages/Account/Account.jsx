import { useState } from "react";
import {
  User,
  Package,
  Settings,
  LogOut,
  Edit,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

/* ---------------- MOCK DATA ---------------- */
const MOCK_USER = {
  name: "Demo User",
  email: "demo@shophub.com",
};

const MOCK_ORDERS = [];

export default function Account() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({});

  const [profileData, setProfileData] = useState({
    firstName: "Demo",
    lastName: "User",
    email: "demo@shophub.com",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  /* ---------------- HANDLERS ---------------- */
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      await new Promise((r) => setTimeout(r, 800));
      setIsEditing(false);
      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      setErrors({ profile: "Failed to update profile" });
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setErrors({});

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrors({ password: "Passwords do not match" });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setErrors({ password: "Password must be at least 6 characters" });
      return;
    }

    await new Promise((r) => setTimeout(r, 800));
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setSuccess("Password changed successfully!");
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleLogout = () => {
    navigate("/signin");
  };

  /* ---------------- NOT SIGNED IN UI ---------------- */
  if (!MOCK_USER) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-md w-full text-center">
          <User className="h-10 w-10 text-blue-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Welcome to Shophub</h1>
          <p className="text-gray-600 mb-6">
            Sign in to access your account
          </p>

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

  /* ---------------- MAIN UI ---------------- */
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
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-center mb-6">
              <User className="h-10 w-10 text-blue-600 mx-auto mb-2" />
              <h2 className="font-semibold">{MOCK_USER.name}</h2>
              <p className="text-sm text-gray-600">{MOCK_USER.email}</p>
            </div>

            <nav className="space-y-2">
              <SidebarBtn
                active={activeTab === "profile"}
                onClick={() => setActiveTab("profile")}
                icon={<User size={18} />}
                label="Profile"
              />
              <SidebarBtn
                active={activeTab === "orders"}
                onClick={() => setActiveTab("orders")}
                icon={<Package size={18} />}
                label={`Orders (${MOCK_ORDERS.length})`}
              />
              <SidebarBtn
                active={activeTab === "settings"}
                onClick={() => setActiveTab("settings")}
                icon={<Settings size={18} />}
                label="Settings"
              />
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <LogOut size={18} className="mr-3" />
                Sign Out
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-sm p-6">
            {activeTab === "profile" && (
              <>
                <div className="flex justify-between mb-6">
                  <h1 className="text-2xl font-bold">Profile</h1>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-blue-600 flex items-center"
                  >
                    <Edit size={16} className="mr-2" />
                    {isEditing ? "Cancel" : "Edit"}
                  </button>
                </div>

                <form onSubmit={handleProfileUpdate} className="grid grid-cols-2 gap-4">
                  {Object.keys(profileData).map((key) => (
                    <input
                      key={key}
                      disabled={!isEditing}
                      value={profileData[key]}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          [key]: e.target.value,
                        })
                      }
                      placeholder={key}
                      className="border px-4 py-2 rounded-lg disabled:bg-gray-50"
                    />
                  ))}

                  {isEditing && (
                    <button
                      type="submit"
                      className="col-span-2 bg-blue-600 text-white py-2 rounded-lg mt-4"
                    >
                      Save Changes
                    </button>
                  )}
                </form>
              </>
            )}

            {activeTab === "orders" && (
              <div className="text-center py-12 text-gray-500">
                <Package className="h-12 w-12 mx-auto mb-4" />
                No orders yet
              </div>
            )}

            {activeTab === "settings" && (
              <>
                <h1 className="text-2xl font-bold mb-6">Settings</h1>

                {errors.password && (
                  <div className="mb-4 text-red-600">{errors.password}</div>
                )}

                <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                  <input
                    type="password"
                    placeholder="Current Password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    className="border px-4 py-2 rounded-lg w-full"
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    className="border px-4 py-2 rounded-lg w-full"
                  />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="border px-4 py-2 rounded-lg w-full"
                  />

                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded-lg"
                  >
                    Change Password
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- SIDEBAR BUTTON ---------------- */
function SidebarBtn({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center px-4 py-3 rounded-lg ${
        active ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
      }`}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </button>
  );
}
