import React from "react";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
function ProductCards({ products }) {
  const navigate= useNavigate()
  console.log(products)
  return (
    <div className="border rounded-xl p-4 hover:shadow-md transition">
      <img
        loading="lazy"
        src={products.image || "/placeholder.svg"}
        alt={products.name}
        className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <h3 className="font-medium">{products.name}</h3>

      <p className="text-sm text-gray-500 mt-1">{products.category.name}</p>

      <div className="flex items-center gap-2 mt-2">
        <span className="font-semibold">₹{products.price}</span>
        <span className="line-through text-sm text-gray-400"></span>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 sm:h-4 sm:w-4 ${
                  i < Math.floor(products.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs sm:text-sm text-gray-600 ml-2">
            {products.rating} ({products.review})
          </span>
        </div>
        <button onClick={()=>{navigate(`/products/${products.id}`)}} className="text-sm border px-3 py-1 rounded-lg">View</button>
      </div>
    </div>
  );
}

export default ProductCards;
