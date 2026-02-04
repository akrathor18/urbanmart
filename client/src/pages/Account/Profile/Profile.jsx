import { Edit } from "lucide-react";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

function Profile() {
  const { errors, setErrors, setSuccess } = useOutletContext();
  const [isEditing, setIsEditing] = useState(false);
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          Profile Information
        </h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center text-blue-600 hover:text-blue-700 text-sm sm:text-base"
        >
          <Edit className="h-4 w-4 mr-2" />
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      {errors.profile && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-600 text-sm">{errors.profile}</p>
        </div>
      )}

      <form onSubmit={handleProfileUpdate}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              value={profileData.firstName || ""}
              onChange={(e) =>
                setProfileData({ ...profileData, firstName: e.target.value })
              }
              disabled={!isEditing}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-50 text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={profileData.lastName || ""}
              onChange={(e) =>
                setProfileData({ ...profileData, lastName: e.target.value })
              }
              disabled={!isEditing}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-50 text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={profileData.email || ""}
              onChange={(e) =>
                setProfileData({ ...profileData, email: e.target.value })
              }
              disabled={!isEditing}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-50 text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              value={profileData.phone || ""}
              onChange={(e) =>
                setProfileData({ ...profileData, phone: e.target.value })
              }
              disabled={!isEditing}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-50 text-sm sm:text-base"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              value={profileData.address || ""}
              onChange={(e) =>
                setProfileData({ ...profileData, address: e.target.value })
              }
              disabled={!isEditing}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-50 text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              value={profileData.city || ""}
              onChange={(e) =>
                setProfileData({ ...profileData, city: e.target.value })
              }
              disabled={!isEditing}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-50 text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State
            </label>
            <input
              type="text"
              value={profileData.state || ""}
              onChange={(e) =>
                setProfileData({ ...profileData, state: e.target.value })
              }
              disabled={!isEditing}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-50 text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PIN Code
            </label>
            <input
              type="text"
              value={profileData.zipCode || ""}
              onChange={(e) =>
                setProfileData({ ...profileData, zipCode: e.target.value })
              }
              disabled={!isEditing}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-50 text-sm sm:text-base"
            />
          </div>
        </div>

        {isEditing && (
          <div className="mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Profile;
