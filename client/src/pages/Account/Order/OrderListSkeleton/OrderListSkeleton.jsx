export default function OrderListSkeleton({ count = 4 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg border p-5 animate-pulse"
        >
          {/* Top row */}
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="h-4 w-48 bg-gray-200 rounded" />
              <div className="h-3 w-32 bg-gray-200 rounded" />
            </div>

            <div className="space-y-2 text-right">
              <div className="h-6 w-20 bg-gray-200 rounded-full" />
              <div className="h-4 w-16 bg-gray-200 rounded ml-auto" />
            </div>
          </div>

          {/* Items */}
          <div className="mt-4 space-y-2">
            <div className="h-3 w-64 bg-gray-200 rounded" />
            <div className="h-3 w-52 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
