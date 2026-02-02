import React from "react";

function ProductCards({products}) {
    console.log(products)
  return (
    <div className="border rounded-xl p-4 hover:shadow-md transition">
      <div className="bg-gray-100 rounded-lg h-48 mb-4" />

      <h3 className="font-medium">{products.name}</h3>

      <p className="text-sm text-gray-500 mt-1">Electronics</p>

      <div className="flex items-center gap-2 mt-2">
        <span className="font-semibold">₹{products.price}</span>
        <span className="line-through text-sm text-gray-400"></span>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="text-yellow-500 text-sm">★★★★☆</span>
        <button className="text-sm border px-3 py-1 rounded-lg">View</button>
      </div>
    </div>
  );
}

export default ProductCards;
