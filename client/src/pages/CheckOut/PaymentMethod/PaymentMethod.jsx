import { CreditCard, Banknote } from "lucide-react";
export default function PaymentMethod({ register }) {
  return (
    <section>
      <div>
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
          Payment Method
        </h2>
        <div className="space-y-3">
          <label className="flex items-center p-3 sm:p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              {...register("paymentMethod")}
              value="RAZORPAY"
              className="mr-3"
            />
            <div className="flex items-center">
              <CreditCard className="h-5 w-5 text-gray-600 mr-3" />
              <div>
                <p className="font-medium text-sm sm:text-base">
                  Credit/Debit Card
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Pay securely with your card
                </p>
              </div>
            </div>
          </label>

          <label className="flex items-center p-3 sm:p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              {...register("paymentMethod")}
              value="COD"
              className="mr-3"
            />
            <div className="flex items-center">
              <Banknote className="h-5 w-5 text-gray-600 mr-3" />
              <div>
                <p className="font-medium text-sm sm:text-base">
                  Cash on Delivery
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Pay when your order is delivered
                </p>
              </div>
            </div>
          </label>
        </div>
      </div>
    </section>
  );
}
