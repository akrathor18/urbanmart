import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
export default function Hero() {

  return (
    <section className="relative bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <span className="inline-block bg-blue-100 text-blue-600 text-sm font-medium px-4 py-1 rounded-full">
            New Season Arrivals
          </span>

          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-tight">
            Discover Products That <br />
            <span className="text-blue-600">Match Your Style</span>
          </h1>

          <p className="text-gray-600 text-lg max-w-xl">
            Shop the latest trends with unbeatable prices. 
            Quality products, fast delivery, and secure checkout — all in one place.
          </p>

          <div className="flex gap-4">
            <Link to="/products">
              <Button size="lg">
                Shop Now
              </Button>
            </Link>

            <Link to="/categories">
              <Button variant="outline" size="lg">
                Browse Categories
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative">
          <div className="absolute -inset-4 bg-blue-100 rounded-3xl blur-3xl opacity-60" />
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
            alt="Shopping"
            className="relative rounded-3xl w-full object-cover shadow-lg"
          />
        </div>

      </div>
    </section>
  );
}
