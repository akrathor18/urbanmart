import { Button } from "@/components/ui/button";

export default function ProductCard({ productData }) {
  return (
    <div className="border rounded-xl overflow-hidden hover:shadow-md transition">

      {/* Image */}
      <div className="h-56 bg-gray-100 flex items-center justify-center">
        <img
          src={productData.image}
          alt={productData.name}
          className="h-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="text-sm font-medium line-clamp-1">
          {productData.name}
        </h3>

        <p className="text-gray-600 font-semibold">
          ₹{productData.price}
        </p>

        <Button className="w-full">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
