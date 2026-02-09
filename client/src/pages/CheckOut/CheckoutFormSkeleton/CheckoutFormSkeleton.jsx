export default function CheckoutFormSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2 space-y-8 animate-pulse">
      
      {/* Section: Shipping Info */}
      <div className="space-y-4">
        <div className="h-5 w-40 bg-gray-200 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-11 bg-gray-200 rounded" />
          <div className="h-11 bg-gray-200 rounded" />
        </div>
        <div className="h-11 bg-gray-200 rounded" />
      </div>

      {/* Section: Shipping Method */}
      <div className="space-y-4">
        <div className="h-5 w-48 bg-gray-200 rounded" />
        <div className="space-y-3">
          <div className="h-14 bg-gray-200 rounded" />
          <div className="h-14 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Section: Payment Method */}
      <div className="space-y-4">
        <div className="h-5 w-44 bg-gray-200 rounded" />
        <div className="flex gap-4">
          <div className="h-12 w-32 bg-gray-200 rounded" />
          <div className="h-12 w-32 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Card Info */}
      <div className="space-y-4">
        <div className="h-11 bg-gray-200 rounded" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-11 bg-gray-200 rounded" />
          <div className="h-11 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Button */}
      <div className="h-14 bg-gray-300 rounded-lg" />
    </div>
  );
}
