import { PackageSearch } from "lucide-react";

export default function NoProductsFound({
  title = "No products found",
  description = "Try adjusting your filters or clear them to see more products.",
  onClear,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <PackageSearch className="w-14 h-14 text-gray-400 mb-4" />

      <h3 className="text-lg font-semibold text-gray-800 mb-1">
        {title}
      </h3>

      <p className="text-sm text-gray-500 max-w-sm">
        {description}
      </p>

      {onClear && (
        <button
          onClick={onClear}
          className="mt-6 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 transition"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
