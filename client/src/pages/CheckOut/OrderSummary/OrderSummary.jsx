import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/utils/formatPrice";

export default function OrderSummary() {
  const cart = useCartStore((s) => s.cart);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="bg-white rounded-xl max-h-fit shadow-sm p-6 sticky top-28">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      <div className="space-y-3 mb-6">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center space-x-3">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-xs sm:text-sm truncate">
                {item.name}
              </p>
              <p className="text-gray-600 text-xs sm:text-sm">
                Qty: {item.quantity}
              </p>
            </div>
            <p className="font-medium text-xs sm:text-sm">
              ₹ {item.price /100 * item.quantity}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 flex justify-between font-semibold">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
}
