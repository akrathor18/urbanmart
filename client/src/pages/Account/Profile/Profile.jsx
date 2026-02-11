import { Edit, User, Mail, Phone, MapPin, Save, X, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { validationRules } from "@/utils/validation.js";
import { useUserStore } from "@/store/useUserStore";
import { mapUserToForm, mapFormToProfilePayload } from "@/utils/mapPlayload";

function Profile() {
  const { getProfile, user, loading, updateProfile, isupdating } =
    useUserStore();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm({ mode: "onBlur" });
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = form;

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  useEffect(() => {
    if (user) {
      reset(mapUserToForm(user));
    }
  }, [user, reset]);

  if (!user || loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 sm:py-24">
        <div className="w-16 h-16 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-600 font-medium">Loading profile...</p>
      </div>
    );
  }

  const onSubmit = (data) => {
    const formdata = mapFormToProfilePayload(data);
    const success = updateProfile(formdata);
    if (success) {
      setIsEditing(false);
    }
  };

  const onError = (errors) => {
    console.log("FORM ERRORS:", errors);
  };

  const handleCancel = () => {
    reset(mapUserToForm(user));
    clearErrors();
    setIsEditing(!isEditing);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-2xl p-5 sm:p-6 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-slate-900 rounded-xl">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                Profile Information
              </h1>
              <p className="text-sm text-slate-600 mt-0.5">
                Manage your personal details
              </p>
            </div>
          </div>
          <button
            onClick={() => handleCancel()}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
              isEditing
                ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                : "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-lg"
            } active:scale-95`}
          >
            {isEditing ? (
              <>
                <X className="h-4 w-4" />
                <span className="text-sm sm:text-base">Cancel</span>
              </>
            ) : (
              <>
                <Edit className="h-4 w-4" />
                <span className="text-sm sm:text-base">Edit Profile</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {errors.profile && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-red-600 text-xs font-bold">!</span>
          </div>
          <p className="text-red-700 text-sm font-medium">{errors.profile}</p>
        </div>
      )}

      {/* Form */}
      <form method="post" onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 mb-6">
          {/* Personal Information Section */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
              <User className="h-4 w-4 text-slate-600" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  First Name
                </label>
                <input
                  disabled={!isEditing}
                  type="text"
                  {...register("firstName", validationRules.firstName)}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-0 transition-all text-sm sm:text-base disabled:bg-slate-50 disabled:text-slate-600 disabled:cursor-not-allowed ${
                    errors.firstName
                      ? "border-red-500 focus:ring-red-500"
                      : "border-slate-300"
                  }`}
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <p className="text-red-600 text-xs sm:text-sm mt-1.5 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Last Name
                </label>
                <input
                  disabled={!isEditing}
                  type="text"
                  {...register("lastName", validationRules.lastName)}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-0 transition-all text-sm sm:text-base disabled:bg-slate-50 disabled:text-slate-600 disabled:cursor-not-allowed ${
                    errors.lastName
                      ? "border-red-500 focus:ring-red-500"
                      : "border-slate-300"
                  }`}
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <p className="text-red-600 text-xs sm:text-sm mt-1.5 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="mb-6 pt-6 border-t border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
              <Mail className="h-4 w-4 text-slate-600" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    disabled={!isEditing}
                    {...register("email", validationRules.email)}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-0 transition-all text-sm sm:text-base disabled:bg-slate-50 disabled:text-slate-600 disabled:cursor-not-allowed ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-slate-300"
                    }`}
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-600 text-xs sm:text-sm mt-1.5 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    disabled={!isEditing}
                    {...register("phone", validationRules.phone)}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-0 transition-all text-sm sm:text-base disabled:bg-slate-50 disabled:text-slate-600 disabled:cursor-not-allowed ${
                      errors.phone
                        ? "border-red-500 focus:ring-red-500"
                        : "border-slate-300"
                    }`}
                    placeholder="+91 98765 43210"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-600 text-xs sm:text-sm mt-1.5 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="pt-6 border-t border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-slate-600" />
              Address Details
            </h3>
            <div className="space-y-4 sm:space-y-5">
              {/* Street Address */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  {...register("address", validationRules.address)}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-0 transition-all text-sm sm:text-base disabled:bg-slate-50 disabled:text-slate-600 disabled:cursor-not-allowed ${
                    errors.address
                      ? "border-red-500 focus:ring-red-500"
                      : "border-slate-300"
                  }`}
                  placeholder="123 Main Street"
                />
                {errors.address && (
                  <p className="text-red-600 text-xs sm:text-sm mt-1.5 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    City
                  </label>
                  <input
                    disabled={!isEditing}
                    {...register("city", validationRules.city)}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-0 transition-all text-sm sm:text-base disabled:bg-slate-50 disabled:text-slate-600 disabled:cursor-not-allowed ${
                      errors.city
                        ? "border-red-500 focus:ring-red-500"
                        : "border-slate-300"
                    }`}
                    placeholder="City"
                  />
                  {errors.city && (
                    <p className="text-red-600 text-xs sm:text-sm mt-1.5 flex items-center gap-1">
                      <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
                      {errors.city.message}
                    </p>
                  )}
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    State
                  </label>
                  <input
                    disabled={!isEditing}
                    {...register("state", validationRules.state)}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-0 transition-all text-sm sm:text-base disabled:bg-slate-50 disabled:text-slate-600 disabled:cursor-not-allowed ${
                      errors.state
                        ? "border-red-500 focus:ring-red-500"
                        : "border-slate-300"
                    }`}
                    placeholder="State"
                  />
                  {errors.state && (
                    <p className="text-red-600 text-xs sm:text-sm mt-1.5 flex items-center gap-1">
                      <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
                      {errors.state.message}
                    </p>
                  )}
                </div>

                {/* PIN Code */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    PIN Code
                  </label>
                  <input
                    disabled={!isEditing}
                    {...register("zipCode", validationRules.zipCode)}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-0 transition-all text-sm sm:text-base disabled:bg-slate-50 disabled:text-slate-600 disabled:cursor-not-allowed ${
                      errors.zipCode
                        ? "border-red-500 focus:ring-red-500"
                        : "border-slate-300"
                    }`}
                    placeholder="123456"
                  />
                  {errors.zipCode && (
                    <p className="text-red-600 text-xs sm:text-sm mt-1.5 flex items-center gap-1">
                      <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
                      {errors.zipCode.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              disabled={isupdating}
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-slate-800 transition-all hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-900 disabled:hover:shadow-none"
            >
              {isupdating ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={isupdating}
              className="inline-flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-6 py-3.5 rounded-xl font-semibold hover:bg-slate-200 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X className="h-5 w-5" />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Profile;