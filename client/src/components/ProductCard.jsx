import { Button } from "@/components/ui/button";

export default function ProductCard() {
  return (
    <div className="border rounded-xl overflow-hidden hover:shadow-md transition">

      {/* Image */}
      <div className="h-56 bg-gray-100 flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
          alt="Product"
          className="h-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="text-sm font-medium line-clamp-1">
          Product Name
        </h3>

        <p className="text-gray-600 font-semibold">
          ₹1,999
        </p>

        <Button className="w-full">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
