import React from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import Link from "next/link";

export default async function ProductsPage() {

  // Fetch data from your backend
  const res = await fetch('http://localhost:5000/allitems', {
  cache: "no-store",
});
  const products = await res.json();

  return (
    <>
      <Navbar />

      <section className="px-6 py-10 bg-gradient-to-b from-green-50 to-white">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-green-800 text-center mb-10">
          Our Products
        </h1>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {["All", "Vegetable", "Fruits", "Dairy", "Fisheries"].map((cat) => (
            <button
              key={cat}
              className="px-5 py-2 border border-green-600 text-green-700 rounded-lg hover:bg-green-600 hover:text-white transition"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-md"
                />

                <h3 className="text-xl font-semibold text-gray-800 mt-4">
                  {product.title}
                </h3>

                <p className="text-green-700 font-medium mt-1">
                  {product.description}
                </p>

                <span className="text-sm mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full w-fit">
                  {product.category}
                </span>

                <Link
                  href={`/item/${product._id}`}
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-center"
                >
                  View Details
                </Link>

              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No products found
            </p>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
