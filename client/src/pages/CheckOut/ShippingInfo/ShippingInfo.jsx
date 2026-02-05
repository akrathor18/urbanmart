import { validationRules } from "@/utils/validation";

export default function ShippingInfo({ register, errors }) {
  return (
    <div>
      <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
        Shipping Information
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            {...register("firstName", {
              required: "First name is required",
              ...validationRules.firstName,
            })}
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
            Last Name *
          </label>
          <input
            type="text"
            {...register("lastName", {
              required: "Last name is required",
              ...validationRules.lastName,
            })}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-sm sm:text-base ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter last name"
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              ...validationRules.email,
            })}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-sm sm:text-base ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone *
          </label>
          <input
            type="tel"
            {...register("phone", {
              required: "Phone number is required",
              ...validationRules.phone,
            })}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-sm sm:text-base ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter 10-digit mobile number"
            max={10}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.phone.message}
            </p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address *
          </label>
          <input
            type="text"
            {...register("address", {
              required: "Address is required",
              ...validationRules.address,
            })}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-sm sm:text-base ${
              errors.address ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your full address"
          />
          {errors.address && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <input
            type="text"
            {...register("city", {
              required: "City is required",
              ...validationRules.city,
            })}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-sm sm:text-base ${
              errors.city ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter city name"
          />
          {errors.city && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.city.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State *
          </label>
          <input
            type="text"
            {...register("state", {
              required: "State is required",
              ...validationRules.state,
            })}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-sm sm:text-base ${
              errors.state ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter state name"
          />
          {errors.state && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.state.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PIN Code *
          </label>
          <input
            type="text"
            {...register("zipCode", {
              required: "PIN code is required",
              ...validationRules.zipCode,
            })}
            className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-sm sm:text-base ${
              errors.zipCode ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter 6-digit PIN code"
          />
          {errors.zipCode && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.zipCode.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
