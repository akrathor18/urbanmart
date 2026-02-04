import {
  validationRules,
  formatCardNumber,
  formatExpiryDate,
} from "@/utils/validation";

export default function CardInfo({ register, errors, setValue }) {
  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setValue("cardNumber", formatted);
  };

  // Handle expiry date formatting
  const handleExpiryDateChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    setValue("expiryDate", formatted);
  };

  return (
    <section>
      {" "}
      <div>
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
          Card Information
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Number *
            </label>
            <input
              type="text"
              {...register("cardNumber", {
                ...validationRules.cardNumber,
                onChange: handleCardNumberChange,
              })}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-sm sm:text-base ${
                errors.cardNumber ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.cardNumber.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date *
              </label>
              <input
                type="text"
                {...register("expiryDate", {
                  ...validationRules.expiryDate,
                  onChange: handleExpiryDateChange,
                })}
                placeholder="MM/YY"
                maxLength="5"
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-sm sm:text-base ${
                  errors.expiryDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.expiryDate && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.expiryDate.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVV *
              </label>
              <input
                type="text"
                {...register("cvv", validationRules.cvv)}
                placeholder="123"
                maxLength="4"
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-sm sm:text-base ${
                  errors.cvv ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.cvv && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.cvv.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name on Card *
            </label>
            <input
              type="text"
              {...register("cardName", validationRules.cardName)}
              placeholder="Enter name as on card"
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-sm sm:text-base ${
                errors.cardName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.cardName && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.cardName.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
