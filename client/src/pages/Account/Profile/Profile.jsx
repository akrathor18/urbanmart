import { Edit } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { validationRules } from "@/utils/validation.js";
function Profile() {
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm({
    mode: "onBlur",
    defaultValues: profileData,
  });
  const onSubmit = (data) => {
    console.log("SUBMIT DATA:", data);
  };

  const onError = (errors) => {
    console.log("FORM ERRORS:", errors);
  };

  const handleCancel = () => {
  reset(profileData);
  clearErrors();
  setIsEditing(!isEditing);
};


  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          Profile Information
        </h1>
        <button
          onClick={() => handleCancel()}
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

      <form method="post" onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              disabled={!isEditing}
              type="text"
              {...register("firstName", validationRules.firstName)}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-sm sm:text-base ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter first name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              disabled={!isEditing}
              type="text"
              {...register("lastName", validationRules.lastName)}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter last name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              disabled={!isEditing}
              {...register("email", validationRules.email)}
              className={`w-full px-4 py-3 border rounded-lg
      ${errors.email ? "border-red-500" : "border-gray-300"}
    `}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>

            <input
              type="tel"
              disabled={!isEditing}
              {...register("phone", validationRules.phone)}
              className={`w-full px-4 py-3 border rounded-lg
      ${errors.phone ? "border-red-500" : "border-gray-300"}
    `}
            />

            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>

            <input
              type="text"
              disabled={!isEditing}
              {...register("address", validationRules.address)}
              className={`w-full px-4 py-3 border rounded-lg
      ${errors.address ? "border-red-500" : "border-gray-300"}
    `}
            />

            {errors.address && (
              <p className="mt-1 text-sm text-red-600">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium mb-2">City</label>
            <input
              disabled={!isEditing}
              {...register("city", validationRules.city)}
              className={`w-full px-4 py-3 border rounded-lg ${
                errors.city ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.city && (
              <p className="text-sm text-red-600 mt-1">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">State</label>
            <input
              disabled={!isEditing}
              {...register("state", validationRules.state)}
              className={`w-full px-4 py-3 border rounded-lg ${
                errors.state ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.state && (
              <p className="text-sm text-red-600 mt-1">
                {errors.state.message}
              </p>
            )}
          </div>
          {/* PIN Code */}
          <div>
            <label className="block text-sm font-medium mb-2">PIN Code</label>
            <input
              disabled={!isEditing}
              {...register("zipCode", validationRules.zipCode)}
              className={`w-full px-4 py-3 border rounded-lg ${
                errors.zipCode ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.zipCode && (
              <p className="text-sm text-red-600 mt-1">
                {errors.zipCode.message}
              </p>
            )}
          </div>
        </div>
        {isEditing && (
          <div className="mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
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
