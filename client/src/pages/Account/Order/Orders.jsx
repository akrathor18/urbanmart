import { formatPrice } from "@/utils/formatPrice";
import { Package } from "lucide-react";
import { useEffect } from "react";
import OrderListSkeleton from "./OrderListSkeleton/OrderListSkeleton";
import ErrorState from "@/components/ErrorState";
import { useOrderStore } from "@/store/useOderStore";

function Orders() {
  const { getOders, orders, loading, error } = useOrderStore();

  useEffect(() => {
    getOders();
  }, []);

  if (loading) {
    return <OrderListSkeleton />;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <Package className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 text-sm sm:text-base">No orders yet</p>
      </div>
    );
  }
  if (error) {
    return <ErrorState message={error} />;
  }
  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
        Order History
      </h1>

      <div className="space-y-4 sm:space-y-6">
        {console.log(orders)}
        {orders.map((order) => (
          <div
            key={order.orderCode}
            className="border border-gray-200 rounded-lg p-4 sm:p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                  Order {order.orderCode}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="mt-2 sm:mt-0 text-left sm:text-right">
                <span
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                    order.status === "DELIVERED"
                      ? "bg-green-100 text-green-800"
                      : order.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {order.status}
                </span>

                <p className="text-base sm:text-lg font-semibold text-gray-900 mt-1">
                  {formatPrice(order.total)}
                </p>

                {order.payment === "COD" && (
                  <p className="text-xs sm:text-sm text-orange-600 mt-1">
                    Cash on Delivery
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between text-xs sm:text-sm"
                >
                  <span>
                    {item.product.name} (x{item.quantity})
                  </span>
                  <span>{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
