function CartPageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto p-4 animate-pulse">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="h-8 w-48 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-32 bg-gray-200 rounded" />
        </div>
        <div className="h-5 w-40 bg-gray-200 rounded" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm p-5 flex gap-4"
            >
              {/* Image */}
              <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0" />

              {/* Info */}
              <div className="flex-1 space-y-3">
                <div className="h-5 w-1/2 bg-gray-200 rounded" />
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
                <div className="h-5 w-24 bg-gray-200 rounded" />
              </div>

              {/* Actions */}
              <div className="flex flex-col items-end justify-between">
                <div className="h-10 w-28 bg-gray-200 rounded-lg" />
                <div className="flex gap-3">
                  <div className="h-5 w-5 bg-gray-200 rounded-full" />
                  <div className="h-5 w-5 bg-gray-200 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Order Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 h-fit">
          <div className="h-6 w-40 bg-gray-200 rounded mb-6" />

          <div className="space-y-4">
            <div className="flex justify-between">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-4 w-20 bg-gray-200 rounded" />
            </div>
            <div className="flex justify-between">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-4 w-16 bg-gray-200 rounded" />
            </div>

            <div className="h-px bg-gray-200 my-4" />

            <div className="flex justify-between">
              <div className="h-5 w-20 bg-gray-200 rounded" />
              <div className="h-5 w-24 bg-gray-200 rounded" />
            </div>

            <div className="h-12 w-full bg-gray-200 rounded-lg mt-6" />
            <div className="h-4 w-32 bg-gray-200 rounded mx-auto mt-3" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPageSkeleton;
