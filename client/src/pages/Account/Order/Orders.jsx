import { formatPrice } from "@/utils/formatPrice";
import { 
  Package, 
  Calendar, 
  CreditCard, 
  ChevronRight, 
  Truck,
  CheckCircle,
  Clock,
  ShoppingBag,
  Receipt
} from "lucide-react";
import { useEffect } from "react";
import OrderListSkeleton from "./OrderListSkeleton/OrderListSkeleton";
import ErrorState from "@/components/ErrorState";
import { useOrderStore } from "@/store/useOderStore";
import { useNavigate } from "react-router-dom";
import statusConfig from "@/utils/statusConfig";
function Orders() {
  const navigate = useNavigate();
  const { getOders, orders, loading, error } = useOrderStore();

  useEffect(() => {
    getOders();
  }, []);

  if (loading) {
    return <OrderListSkeleton />;
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 sm:py-24 px-4">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <Package className="h-10 w-10 sm:h-12 sm:w-12 text-slate-400" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
          No orders yet
        </h3>
        <p className="text-slate-500 text-sm sm:text-base mb-6 text-center max-w-md">
          Start shopping to see your orders here
        </p>
        <button
          onClick={() => navigate("/products")}
          className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition-all hover:shadow-lg active:scale-95 font-medium"
        >
          <ShoppingBag className="h-4 w-4" />
          Start Shopping
        </button>
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  // Status configuration
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-slate-100 rounded-xl">
            <Receipt className="h-5 w-5 sm:h-6 sm:w-6 text-slate-700" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Order History
          </h1>
        </div>
        <p className="text-slate-600 text-sm sm:text-base pl-14">
          {orders.length} {orders.length === 1 ? 'order' : 'orders'} found
        </p>
      </div>

      {/* Orders List */}
      <div className="space-y-4 sm:space-y-5">
        {orders.map((order) => {
          const currentStatus = statusConfig[order.status] || statusConfig.pending;
          const StatusIcon = currentStatus.icon;

          return (
            <div
              key={order.orderCode}
              onClick={() => navigate(`./${order.orderCode}`)}
              className="group bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 hover:shadow-lg hover:border-slate-300 transition-all cursor-pointer"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                      Order #{order.orderCode}
                    </h3>
                    <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 text-xs sm:text-sm">
                    <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span>
                      Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-2">
                  {/* Status Badge */}
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border ${currentStatus.color} w-fit`}
                  >
                    <StatusIcon className="h-3.5 w-3.5 flex-shrink-0" />
                    {currentStatus.label}
                  </span>

                  {/* Total Amount */}
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs sm:text-sm text-slate-600">Total:</span>
                    <span className="text-lg sm:text-xl font-bold text-slate-900">
                      {formatPrice(order.totalAmount)}
                    </span>
                  </div>

                  {/* Payment Method */}
                  {order.paymentMethod === "COD" && (
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm text-orange-600 font-medium bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200">
                      <CreditCard className="h-3.5 w-3.5 flex-shrink-0" />
                      Cash on Delivery
                    </div>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-2.5">
                <h4 className="text-xs sm:text-sm font-semibold text-slate-700 uppercase tracking-wide flex items-center gap-2">
                  <Package className="h-3.5 w-3.5" />
                  Items ({order.items.length})
                </h4>
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-4 p-2.5 sm:p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {item.product.image && (
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover border border-slate-200 flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm sm:text-base font-medium text-slate-900 truncate">
                            {item.product.name}
                          </p>
                          <p className="text-xs sm:text-sm text-slate-600">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm sm:text-base font-semibold text-slate-900 flex-shrink-0">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* View Details Hint */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-end gap-2 text-slate-600 group-hover:text-slate-900 transition-colors">
                  <span className="text-xs sm:text-sm font-medium">View Details</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Orders;