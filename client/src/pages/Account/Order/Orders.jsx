import { formatPrice } from "@/utils/formatPrice";
import { Package } from "lucide-react";
import React from "react";

function Orders() {
  const orders = [];
  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
        Order History
      </h1>
      {orders.length === 0 ? (
        <div className="text-center py-8">
          <Package className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-sm sm:text-base">No orders yet</p>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-lg p-4 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                    Order {order.id}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Placed on {order.date}
                  </p>
                </div>
                <div className="mt-2 sm:mt-0 text-left sm:text-right">
                  <span
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {order.status}
                  </span>
                  <p className="text-base sm:text-lg font-semibold text-gray-900 mt-1">
                    {formatPrice(order.total)}
                  </p>
                  {order.paymentMethod === "cod" && (
                    <p className="text-xs sm:text-sm text-orange-600 mt-1">
                      Cash on Delivery
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-xs sm:text-sm"
                  >
                    <span>
                      {item.name} (x{item.quantity})
                    </span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
