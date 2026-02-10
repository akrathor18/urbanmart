function ProductDetailsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-sm p-6 grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
        
        {/* Left: Image Section */}
        <div>
          <div className="w-full h-[420px] bg-gray-200 rounded-lg mb-4" />
          <div className="flex gap-3">
            <div className="w-20 h-20 bg-gray-200 rounded-md" />
            <div className="w-20 h-20 bg-gray-200 rounded-md" />
            <div className="w-20 h-20 bg-gray-200 rounded-md" />
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="space-y-4">
          <div className="h-7 w-3/4 bg-gray-200 rounded" />
          <div className="h-4 w-32 bg-gray-200 rounded" />
          <div className="h-6 w-28 bg-gray-200 rounded" />

          <div className="space-y-2 mt-4">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 rounded" />
          </div>

          <div className="space-y-2 mt-4">
            <div className="h-4 w-40 bg-gray-200 rounded" />
            <div className="h-4 w-44 bg-gray-200 rounded" />
            <div className="h-4 w-36 bg-gray-200 rounded" />
          </div>

          <div className="h-5 w-32 bg-gray-200 rounded mt-4" />

          <div className="flex items-center gap-4 mt-6">
            <div className="h-10 w-24 bg-gray-200 rounded-lg" />
            <div className="h-10 w-36 bg-gray-200 rounded-lg" />
          </div>

          <div className="flex gap-6 mt-6">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </div>
        </div>
      </div>

      {/* Related Products Skeleton */}
      <div className="mt-10">
        <div className="h-6 w-48 bg-gray-200 rounded mb-6 animate-pulse" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-3 shadow-sm animate-pulse">
              <div className="w-full h-40 bg-gray-200 rounded-md mb-3" />
              <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-1/2 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsSkeleton;
