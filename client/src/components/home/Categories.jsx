import { Link } from "react-router-dom";

const categories = [
  {
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475",
    slug: "electronics",
  },
  {
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    slug: "accessories",
  },
  {
    name: "Gaming",
    image:
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5",
    slug: "gaming",
  },
  {
    name: "Fitness",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    slug: "fitness",
  },
];

export default function Categories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight">
            Shop by Category
          </h2>
          <p className="text-gray-600 mt-1">
            Find products by your interests
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/categories/${category.slug}`}
              className="group relative rounded-xl overflow-hidden bg-white border hover:shadow-md transition"
            >
              {/* Image */}
              <div className="h-40 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition" />

              {/* Title */}
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-white font-semibold text-lg drop-shadow">
                  {category.name}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
