import React, { useEffect } from "react";
import {
  Package,
  MapPin,
  CreditCard,
  Phone,
  Calendar,
  ChevronLeft,
  Download,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  Share2,
} from "lucide-react";
import OrderDetailsSkeleton from "./OrderDetailsSkeleton/OrderDetailsSkeleton";
import { useOrderStore } from "@/store/useOderStore";
import { useParams } from "react-router-dom";

function OrderDetailsPage({ onBack }) {
  const { id } = useParams();

  const { getOrderDetails, orderDetail, orderDetailError, loadingOrderDetail } =
    useOrderStore();

  useEffect(() => {
    getOrderDetails(id);
    console.log(orderDetail);
  }, []);

  // Show skeleton while loading
  if (loadingOrderDetail) {
    return <OrderDetailsSkeleton />;
  }

  // Handle error state
  if (orderDetailError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-red-200 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Error Loading Order
          </h2>
          <p className="text-slate-600 mb-4">{orderDetailError}</p>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Status configuration
  const statusConfig = {
    pending: {
      color: "bg-amber-50 text-amber-700 border-amber-200",
      icon: Clock,
      label: "Pending",
    },
    processing: {
      color: "bg-blue-50 text-blue-700 border-blue-200",
      icon: Package,
      label: "Processing",
    },
    shipped: {
      color: "bg-purple-50 text-purple-700 border-purple-200",
      icon: Truck,
      label: "Shipped",
    },
    delivered: {
      color: "bg-green-50 text-green-700 border-green-200",
      icon: CheckCircle2,
      label: "Delivered",
    },
    cancelled: {
      color: "bg-red-50 text-red-700 border-red-200",
      icon: XCircle,
      label: "Cancelled",
    },
  };

  const currentStatus =
    statusConfig[orderDetail?.status] || statusConfig.pending;
  const StatusIcon = currentStatus.icon;

  // Calculate pricing breakdown
  const subtotal = orderDetail?.total || 0;
  const shipping = orderDetail?.shippingCost || 0;
  const tax = orderDetail?.tax || 0;
  const discount = orderDetail?.discount || 0;

  return (
    <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
      {/* Mobile Header with Back Button */}
      <div className="flex items-center justify-between gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm sm:text-base font-medium hidden sm:inline">
              Back to Orders
            </span>
            <span className="text-sm font-medium sm:hidden">Back</span>
          </button>
        )}

        {/* Mobile Action Buttons */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            title="Share Order"
          >
            <Share2 className="w-5 h-5 text-slate-600" />
          </button>
          <button
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            title="Download Invoice"
          >
            <Download className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Header Card - Mobile Optimized */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100">
        <div className="space-y-4">
          {/* Mobile: Stack vertically */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-slate-100 rounded-lg flex-shrink-0">
              <Package className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-sm sm:text-2xl font-bold text-slate-900 truncate">
                Order #{orderDetail?.orderCode}
              </h1>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mt-1">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="truncate">
                  Placed on {orderDetail?.createdAt}
                </span>
              </div>
            </div>
          </div>

          {/* Status Badge - Full Width on Mobile */}
          <div className="flex items-center justify-between gap-3">
            <span
              className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border ${currentStatus.color} flex-1 sm:flex-initial justify-center sm:justify-start`}
            >
              <StatusIcon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate">{currentStatus.label}</span>
            </span>

            {/* Desktop Action Button */}
            <button
              className="hidden sm:flex p-2 hover:bg-slate-100 rounded-lg transition-colors"
              title="Download Invoice"
            >
              <Download className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Delivery & Payment Grid - Stacks on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Delivery Address */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 bg-emerald-50 rounded-lg flex-shrink-0">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-900 text-base sm:text-lg">
                Delivery Address
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Shipping information
              </p>
            </div>
          </div>

          <div className="space-y-2 pl-0 sm:pl-11">
            <p className="font-medium text-slate-900 text-sm sm:text-base">
              {orderDetail?.address?.fullName || "N/A"}
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {orderDetail?.address?.line1 || "N/A"}
              {orderDetail?.address?.line2 && (
                <>
                  <br />
                  {orderDetail.address.line2}
                </>
              )}
            </p>
            <p className="text-slate-600 text-sm sm:text-base">
              {orderDetail?.address?.city || "N/A"},{" "}
              {orderDetail?.address?.state || "N/A"} -{" "}
              {orderDetail?.address?.pincode || "N/A"}
            </p>
            <div className="flex items-center gap-2 text-slate-600 pt-2">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400 flex-shrink-0" />
              <span className="font-medium text-sm sm:text-base">
                {orderDetail?.address?.phone || "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-900 text-base sm:text-lg">
                Payment Details
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Transaction information
              </p>
            </div>
          </div>

          <div className="space-y-3 pl-0 sm:pl-11">
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-600 text-sm sm:text-base">
                Payment Method
              </span>
              <span className="font-semibold text-slate-900 text-sm sm:text-base text-right">
                {orderDetail?.payment || "N/A"}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 pt-3 border-t border-slate-100">
              <span className="text-slate-600 text-sm sm:text-base">
                Total Amount
              </span>
              <span className="font-bold text-slate-900 text-base sm:text-lg">
                ₹{orderDetail?.total?.toLocaleString("en-IN") || "0"}
              </span>
            </div>
            {orderDetail?.paymentStatus && (
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-600 text-sm sm:text-base">
                  Status
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700">
                  <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                  <span>{orderDetail.status}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Items - Mobile Optimized */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100">
        <div className="flex items-start gap-3 mb-4 sm:mb-6">
          <div className="p-2 bg-violet-50 rounded-lg flex-shrink-0">
            <Package className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 text-base sm:text-lg">
              Order Items
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {orderDetail?.items?.length || 0}{" "}
              {orderDetail?.items?.length === 1 ? "item" : "items"} in this
              order
            </p>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {orderDetail?.items?.map((item, index) => (
            <div
              key={item?.product?.id || index}
              className={`flex gap-3 sm:gap-4 items-start sm:items-center p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-slate-50 transition-colors ${
                index !== orderDetail.items.length - 1
                  ? "border-b border-slate-100"
                  : ""
              }`}
            >
              <div className="relative group flex-shrink-0">
                <img
                  src={item?.product?.image}
                  alt={item?.product?.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl object-cover border border-slate-200 group-hover:scale-105 transition-transform"
                />
                <div className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 bg-slate-900 text-white text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                  {item?.quantity}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 text-sm sm:text-base line-clamp-2">
                  {item?.product?.name}
                </p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1.5">
                  <span className="text-xs sm:text-sm text-slate-500">
                    ₹{item?.price?.toLocaleString("en-IN")} × {item?.quantity}
                  </span>
                  {item?.product?.sku && (
                    <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      SKU: {item.product.sku}
                    </span>
                  )}
                </div>
                {/* Mobile: Show price below on small screens */}
                <div className="mt-2 sm:hidden">
                  <p className="font-bold text-slate-900 text-base">
                    ₹
                    {(
                      (item?.price || 0) * (item?.quantity || 0)
                    ).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              {/* Desktop: Show price on the right */}
              <div className="hidden sm:block text-right flex-shrink-0">
                <p className="font-bold text-slate-900 text-lg">
                  ₹
                  {((item?.price || 0) * (item?.quantity || 0)).toLocaleString(
                    "en-IN",
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary - Mobile Optimized */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg text-white">
        <h3 className="font-semibold text-base sm:text-lg mb-4 sm:mb-6 flex items-center gap-2">
          <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          <span>Order Summary</span>
        </h3>

        <div className="space-y-2.5 sm:space-y-3">
          <div className="flex justify-between items-center text-slate-300 text-sm sm:text-base">
            <span>Subtotal</span>
            <span className="font-medium">
              ₹{subtotal?.toLocaleString("en-IN")}
            </span>
          </div>

          {shipping > 0 && (
            <div className="flex justify-between items-center text-slate-300 text-sm sm:text-base">
              <span>Shipping</span>
              <span className="font-medium">
                ₹{shipping?.toLocaleString("en-IN")}
              </span>
            </div>
          )}

          {tax > 0 && (
            <div className="flex justify-between items-center text-slate-300 text-sm sm:text-base">
              <span>Tax</span>
              <span className="font-medium">
                ₹{tax?.toLocaleString("en-IN")}
              </span>
            </div>
          )}

          {discount > 0 && (
            <div className="flex justify-between items-center text-green-400 text-sm sm:text-base">
              <span>Discount</span>
              <span className="font-medium">
                -₹{discount?.toLocaleString("en-IN")}
              </span>
            </div>
          )}

          <div className="border-t border-slate-700 pt-3 mt-3">
            <div className="flex justify-between items-center">
              <span className="text-base sm:text-lg font-semibold">Total</span>
              <span className="text-xl sm:text-2xl font-bold">
                ₹{orderDetail?.total?.toLocaleString("en-IN") || "0"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsPage;
