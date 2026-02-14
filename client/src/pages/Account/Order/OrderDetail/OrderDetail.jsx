import React, { useEffect } from "react";
import {
  Package,
  MapPin,
  CreditCard,
  Phone,
  Calendar,
  ChevronLeft,
  Download,
  CheckCircle2,
  XCircle,
  Share2,
  Truck,
} from "lucide-react";
import statusConfig from "@/utils/statusConfig";
import OrderDetailsSkeleton from "./OrderDetailsSkeleton/OrderDetailsSkeleton";
import { useOrderStore } from "@/store/useOderStore";
import { useParams } from "react-router-dom";
import { formatPrice } from "@/utils/formatPrice";

function OrderDetailsPage({ onBack }) {
  const { id } = useParams();

  const { getOrderDetails, orderDetail, orderDetailError, loadingOrderDetail } =
    useOrderStore();

  useEffect(() => {
    getOrderDetails(id);
  }, [id, getOrderDetails]);

  // Show skeleton while loading
  if (loadingOrderDetail) {
    return <OrderDetailsSkeleton />;
  }

  // Handle error state
  if (orderDetailError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl sm:rounded-3xl sm:p-8 shadow-xl border border-rose-100 max-w-md w-full text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-orange-500/5 pointer-events-none"></div>

          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-rose-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
              <XCircle className="w-8 h-8 sm:w-10 sm:h-10 text-rose-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-3">
              Unable to Load Order
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6 leading-relaxed">
              {orderDetailError}
            </p>
            <button
              onClick={() => window.history.back()}
              className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium text-sm sm:text-base active:scale-95"
            >
              Return to Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Status configuration with fallback
  const currentStatus = statusConfig[orderDetail?.status] || statusConfig.CREATED;
  const StatusIcon = currentStatus?.icon;

  // Calculate pricing breakdown
  const subtotal = orderDetail?.totalAmount || 0;
  const shipping = orderDetail?.shippingCost || 0;
  const tax = orderDetail?.tax || 0;
  const discount = orderDetail?.discount || 0;

  // Format date nicely
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full  max-w-6xl mx-auto space-y-4 sm:space-y-6">
      {/* Enhanced Header with Actions */}
      <div className="flex items-center justify-between gap-2 sm:gap-4 mb-2">
        {onBack && (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1 sm:gap-2 text-slate-600 hover:text-slate-900 transition-all duration-200 group hover:gap-2 sm:hover:gap-3 active:scale-95 min-h-10 min-w-10 justify-center"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 group-hover:scale-110 transition-transform" />
            <span className="font-medium hidden sm:inline text-sm">Back to Orders</span>
            <span className="font-medium sm:hidden text-sm">Back</span>
          </button>
        )}
      </div>

      {/* Hero Header Card with Enhanced Design */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-slate-700 overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 sm:w-64 sm:h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-tr from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>

        <div className="relative">
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/10 backdrop-blur-sm rounded-lg mb-3 sm:mb-4 border border-white/20">
                <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-xs font-medium text-white/90">Order Details</span>
              </div>

              <h1 className="text-base sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 break-words">
                #{orderDetail?.orderCode}
              </h1>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-white/70">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span className="line-clamp-1">{formatDate(orderDetail?.createdAt)}</span>
                </div>
                {orderDetail?.items?.length > 0 && (
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                    <Package className="w-4 h-4 flex-shrink-0" />
                    <span>{orderDetail.items.length} item{orderDetail.items.length !== 1 ? "s" : ""}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Status Badge */}
            <div className="flex flex-col items-start sm:items-end gap-2 sm:gap-3 mt-2 sm:mt-0">
              <span
                className={`inline-flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold border-2 shadow-lg backdrop-blur-sm ${currentStatus.color} transition-all duration-200 hover:scale-105`}
              >
                <StatusIcon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span>{currentStatus.label}</span>
              </span>

              <div className="text-left sm:text-right">
                <p className="text-xs text-white/60 mb-0.5 sm:mb-1">Total Amount</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                  {formatPrice(orderDetail?.totalAmount)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout - Address & Payment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Enhanced Delivery Address Card */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 hover:border-emerald-200 group">
          <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5">
            <div className="p-2.5 sm:p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl sm:rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-0.5 sm:mb-1">
                Delivery Address
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">Where your order will arrive</p>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4 pl-0 sm:pl-1">
            <div>
              <p className="font-semibold text-slate-900 text-base sm:text-lg mb-1 sm:mb-2">
                {orderDetail?.address?.fullName || "N/A"}
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {orderDetail?.address?.line1 || "N/A"}
                {orderDetail?.address?.line2 && (
                  <>
                    <br />
                    {orderDetail.address.line2}
                  </>
                )}
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-600 font-medium">
              {orderDetail?.address?.city || "N/A"}, {orderDetail?.address?.state || "N/A"} -{" "}
              {orderDetail?.address?.pincode || "N/A"}
            </p>

            <div className="flex items-center gap-3 pt-3 mt-3 border-t border-slate-100">
              <div className="p-2 bg-slate-100 rounded-lg flex-shrink-0">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
              </div>
              <span className="font-medium text-slate-900 text-sm sm:text-base break-all">
                {orderDetail?.address?.phone || "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Payment Card */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 hover:border-blue-200 group">
          <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5">
            <div className="p-2.5 sm:p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
              <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-0.5 sm:mb-1">
                Payment Details
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">Transaction information</p>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4 pl-0 sm:pl-1">
            <div className="flex items-center justify-between p-2.5 sm:p-3 bg-slate-50 rounded-xl text-xs sm:text-sm">
              <span className="text-slate-600 font-medium">Payment Method</span>
              <span className="font-bold text-slate-900 text-right break-words ml-2">
                {orderDetail?.paymentMethod || "N/A"}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl text-white gap-2">
              <span className="font-medium text-sm sm:text-base">Total Amount</span>
              <span className="font-bold text-lg sm:text-2xl flex-shrink-0">
                {formatPrice(orderDetail?.totalAmount || 0)}
              </span>
            </div>

            {orderDetail?.status && (
              <div className="flex items-center justify-between p-2.5 sm:p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs sm:text-sm gap-2">
                <span className="text-slate-700 font-medium">Payment Status</span>
                <span className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-lg font-semibold text-emerald-700 bg-white border border-emerald-200 flex-shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">{orderDetail.status}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Order Items Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-slate-200">
        <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="p-2.5 sm:p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl sm:rounded-2xl shadow-lg flex-shrink-0">
            <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-900 text-base sm:text-xl mb-0.5 sm:mb-1">
              Order Items
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              {orderDetail?.items?.length || 0}{" "}
              {orderDetail?.items?.length === 1 ? "item" : "items"} in this order
            </p>
          </div>
        </div>

        <div className="space-y-2 sm:space-y-3">
          {orderDetail?.items?.map((item, index) => (
            <div
              key={item?.product?.id || index}
              className="flex gap-3 sm:gap-4 items-start sm:items-center p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-gradient-to-r hover:from-slate-50 hover:to-transparent transition-all duration-200 border border-transparent hover:border-slate-200 group"
            >
              {/* Enhanced Product Image */}
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-lg sm:rounded-2xl overflow-hidden border-2 border-slate-200 group-hover:border-slate-300 transition-all group-hover:shadow-lg">
                  <img
                    src={item?.product?.image}
                    alt={item?.product?.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute -top-2 -right-2 bg-gradient-to-br from-slate-900 to-slate-800 text-white text-xs font-bold rounded-lg sm:rounded-xl w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center shadow-lg border-2 border-white">
                  {item?.quantity}
                </div>
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-900 text-sm sm:text-base lg:text-lg line-clamp-2 mb-1.5 sm:mb-2 group-hover:text-slate-700 transition-colors">
                  {item?.product?.name}
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-3">
                  <span className="inline-flex items-center gap-1 text-xs sm:text-sm text-slate-600 bg-slate-100 px-2 sm:px-3 py-1 rounded-lg whitespace-nowrap">
                    <span className="font-semibold">{formatPrice(item?.price)}</span>
                    <span className="text-slate-400">×</span>
                    <span>{item?.quantity}</span>
                  </span>
                  {item?.product?.sku && (
                    <span className="text-xs text-slate-500 bg-slate-50 px-2 sm:px-2.5 py-1 rounded-lg border border-slate-200 whitespace-nowrap">
                      SKU: {item.product.sku}
                    </span>
                  )}
                </div>
              </div>

              {/* Price Display */}
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-slate-900 text-base sm:text-lg lg:text-xl whitespace-nowrap">
                  {formatPrice((item?.price || 0) * (item?.quantity || 0))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Order Summary */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>

        <div className="relative">
          <h3 className="font-bold text-lg sm:text-xl mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
            <div className="p-2 bg-white/10 rounded-lg sm:rounded-xl backdrop-blur-sm">
              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span>Order Summary</span>
          </h3>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex justify-between items-center text-white/80 text-xs sm:text-sm pb-2 sm:pb-3 border-b border-white/10">
              <span>Subtotal</span>
              <span className="font-semibold text-white">{formatPrice(subtotal)}</span>
            </div>

            {shipping > 0 && (
              <div className="flex justify-between items-center text-white/80 text-xs sm:text-sm pb-2 sm:pb-3 border-b border-white/10">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4" />
                  Shipping
                </span>
                <span className="font-semibold text-white">{formatPrice(shipping)}</span>
              </div>
            )}

            {tax > 0 && (
              <div className="flex justify-between items-center text-white/80 text-xs sm:text-sm pb-2 sm:pb-3 border-b border-white/10">
                <span>Tax</span>
                <span className="font-semibold text-white">{formatPrice(tax)}</span>
              </div>
            )}

            {discount > 0 && (
              <div className="flex justify-between items-center text-emerald-400 text-xs sm:text-sm pb-2 sm:pb-3 border-b border-white/10">
                <span className="font-medium">Discount Applied</span>
                <span className="font-semibold">-{formatPrice(discount)}</span>
              </div>
            )}

            <div className="pt-3 sm:pt-5 mt-2">
              <div className="flex justify-between items-center bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-white/20 gap-2">
                <span className="text-base sm:text-lg lg:text-xl font-bold">Total Amount</span>
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white whitespace-nowrap">
                  {formatPrice(orderDetail?.totalAmount)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsPage;
