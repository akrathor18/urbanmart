import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
function Settings() {
  const { errors, setErrors, setSuccess } = useOutletContext();
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

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
  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
        Account Settings
      </h1>
      <div className="space-y-6">
        {/* Change Password */}
        <div className="border border-gray-200 rounded-lg p-4 sm:p-6">
          <h3 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">
            Change Password
          </h3>

          {errors.password && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{errors.password}</p>
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    currentPassword: e.target.value,
                  })
                }
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm sm:text-base"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              Change Password
            </button>
          </form>
        </div>

        {/* Email Notifications */}
        <div className="border border-gray-200 rounded-lg p-4 sm:p-6">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">
            Email Notifications
          </h3>
          <div className="space-y-3">
            <label className="flex items-center text-sm sm:text-base">
              <input type="checkbox" defaultChecked className="mr-3" />
              Order updates and shipping notifications
            </label>
            <label className="flex items-center text-sm sm:text-base">
              <input type="checkbox" defaultChecked className="mr-3" />
              New product announcements
            </label>
            <label className="flex items-center text-sm sm:text-base">
              <input type="checkbox" className="mr-3" />
              Marketing emails and promotions
            </label>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="border border-gray-200 rounded-lg p-4 sm:p-6">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">
            Privacy Settings
          </h3>
          <div className="space-y-3">
            <label className="flex items-center text-sm sm:text-base">
              <input type="checkbox" defaultChecked className="mr-3" />
              Allow personalized recommendations
            </label>
            <label className="flex items-center text-sm sm:text-base">
              <input type="checkbox" className="mr-3" />
              Share data for analytics
            </label>
          </div>
        </div>

        {/* Account Actions */}
        <div className="border border-gray-200 rounded-lg p-4 sm:p-6">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">
            Account Actions
          </h3>
          <div className="space-y-3">
            <button className="text-red-600 hover:text-red-700 font-medium text-sm sm:text-base">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
