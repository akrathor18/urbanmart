import { Link } from "react-router-dom";
import { useWishlistStore } from "@/store/useWislistStore";
import { useCartStore } from "@/store/useCartStore";
import EmptyWishlist from "./EmptyWishlist/EmptyWishlist";
import WishlistCard from "./WishlistCard/WishlistCard";
import { ArrowLeft } from "lucide-react";
export default function Wishlist() {
  const { addToCart } = useCartStore();
  const { wishlist } = useWishlistStore();
  if (wishlist.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              My Wishlist
            </h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              {wishlist.length} item{wishlist.length !== 1 ? "s" : ""} saved for
              later
            </p>
          </div>
          <Link
            to="/products"
            className="flex gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base"
          >
            <ArrowLeft /> Continue Shopping
          </Link>
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {wishlist.map((item) => (
            <WishlistCard item={item} />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Love Everything?
            </h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              Add all your wishlist items to cart with one click
            </p>
            <button
              onClick={() => {
                wishlist.forEach((item) => addToCart(item));
              }}
              className="bg-black text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-sm sm:text-base"
            >
              Add All to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
