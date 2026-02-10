import React from "react";
function OrderDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Back Button Skeleton */}
        <div className="flex items-center gap-2 animate-pulse">
          <div className="w-4 h-4 bg-slate-200 rounded"></div>
          <div className="h-4 w-28 bg-slate-200 rounded"></div>
        </div>

        {/* Header Card Skeleton */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-pulse">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-200 rounded-lg"></div>
                <div className="space-y-2">
                  <div className="h-8 w-48 bg-slate-200 rounded"></div>
                  <div className="h-4 w-36 bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-9 w-32 bg-slate-200 rounded-full"></div>
              <div className="w-9 h-9 bg-slate-200 rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* Delivery & Payment Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Delivery Address Skeleton */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-pulse">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg"></div>
              <div className="space-y-2">
                <div className="h-6 w-36 bg-slate-200 rounded"></div>
                <div className="h-3 w-32 bg-slate-200 rounded"></div>
              </div>
            </div>

            <div className="space-y-3 pl-11">
              <div className="h-5 w-40 bg-slate-200 rounded"></div>
              <div className="h-4 w-full bg-slate-200 rounded"></div>
              <div className="h-4 w-3/4 bg-slate-200 rounded"></div>
              <div className="h-4 w-48 bg-slate-200 rounded"></div>
              <div className="flex items-center gap-2 pt-2">
                <div className="w-4 h-4 bg-slate-200 rounded"></div>
                <div className="h-4 w-32 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>

          {/* Payment Information Skeleton */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-pulse">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg"></div>
              <div className="space-y-2">
                <div className="h-6 w-36 bg-slate-200 rounded"></div>
                <div className="h-3 w-40 bg-slate-200 rounded"></div>
              </div>
            </div>

            <div className="space-y-3 pl-11">
              <div className="flex items-center justify-between">
                <div className="h-4 w-28 bg-slate-200 rounded"></div>
                <div className="h-4 w-20 bg-slate-200 rounded"></div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="h-4 w-24 bg-slate-200 rounded"></div>
                <div className="h-6 w-24 bg-slate-200 rounded"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="h-4 w-16 bg-slate-200 rounded"></div>
                <div className="h-5 w-16 bg-slate-200 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items Skeleton */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-pulse">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-violet-100 rounded-lg"></div>
            <div className="space-y-2">
              <div className="h-6 w-28 bg-slate-200 rounded"></div>
              <div className="h-3 w-36 bg-slate-200 rounded"></div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Item 1 */}
            <div className="flex gap-4 items-center p-4 rounded-xl border-b border-slate-100">
              <div className="relative">
                <div className="w-20 h-20 bg-slate-200 rounded-xl"></div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-slate-300 rounded-full"></div>
              </div>

              <div className="flex-1 space-y-2">
                <div className="h-5 w-48 bg-slate-200 rounded"></div>
                <div className="flex items-center gap-3">
                  <div className="h-4 w-24 bg-slate-200 rounded"></div>
                  <div className="h-4 w-20 bg-slate-200 rounded"></div>
                </div>
              </div>

              <div className="h-6 w-20 bg-slate-200 rounded"></div>
            </div>

            {/* Item 2 */}
            <div className="flex gap-4 items-center p-4 rounded-xl">
              <div className="relative">
                <div className="w-20 h-20 bg-slate-200 rounded-xl"></div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-slate-300 rounded-full"></div>
              </div>

              <div className="flex-1 space-y-2">
                <div className="h-5 w-56 bg-slate-200 rounded"></div>
                <div className="flex items-center gap-3">
                  <div className="h-4 w-24 bg-slate-200 rounded"></div>
                  <div className="h-4 w-20 bg-slate-200 rounded"></div>
                </div>
              </div>

              <div className="h-6 w-20 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Order Summary Skeleton */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 shadow-lg animate-pulse">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-5 h-5 bg-slate-700 rounded"></div>
            <div className="h-6 w-32 bg-slate-700 rounded"></div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="h-4 w-20 bg-slate-700 rounded"></div>
              <div className="h-4 w-24 bg-slate-700 rounded"></div>
            </div>

            <div className="flex justify-between items-center">
              <div className="h-4 w-20 bg-slate-700 rounded"></div>
              <div className="h-4 w-20 bg-slate-700 rounded"></div>
            </div>

            <div className="flex justify-between items-center">
              <div className="h-4 w-16 bg-slate-700 rounded"></div>
              <div className="h-4 w-20 bg-slate-700 rounded"></div>
            </div>

            <div className="flex justify-between items-center">
              <div className="h-4 w-20 bg-slate-700 rounded"></div>
              <div className="h-4 w-24 bg-slate-700 rounded"></div>
            </div>

            <div className="border-t border-slate-700 pt-3 mt-3">
              <div className="flex justify-between items-center">
                <div className="h-6 w-16 bg-slate-700 rounded"></div>
                <div className="h-8 w-32 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsSkeleton;
