export default function ProductCardSkeleton() {
    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 8}).map((_, i) => (
                <div key={i} className="border rounded-xl overflow-hidden animate-pulse">
                
                    {/* Image skeleton */}
                    <div className="h-56 bg-gray-200" />

                    {/* Content skeleton */}
                    <div className="p-4 space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 rounded w-1/3" />
                        <div className="h-9 bg-gray-200 rounded w-full mt-2" />
                    </div>
                </div>
            ))}
        </div>
    );
}
