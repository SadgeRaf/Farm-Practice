import React from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

export default function ProductsPage() {
  // Fake JSON product data
  const products = [
    {
      id: 1,
      name: "Fresh Cucumbers",
      price: "120 BDT / kg",
      category: "Vegetable",
      image: "https://i.postimg.cc/8cL7SYm7/Feed-Your-Dog-in-Winters-900x600.jpg",
    },
    {
      id: 2,
      name: "Organic Tomatoes",
      price: "90 BDT / kg",
      category: "Vegetable",
      image: "https://i.postimg.cc/8cL7SYm7/Feed-Your-Dog-in-Winters-900x600.jpg",
    },
    {
      id: 3,
      name: "Farm Fresh Milk",
      price: "65 BDT / liter",
      category: "Dairy",
      image: "https://i.postimg.cc/8cL7SYm7/Feed-Your-Dog-in-Winters-900x600.jpg",
    },
    {
      id: 4,
      name: "Rohu Fish",
      price: "350 BDT / kg",
      category: "Fisheries",
      image: "https://i.postimg.cc/8cL7SYm7/Feed-Your-Dog-in-Winters-900x600.jpg",
    },
    {
      id: 5,
      name: "Fresh Mangoes",
      price: "150 BDT / kg",
      category: "Fruits",
      image: "https://i.postimg.cc/8cL7SYm7/Feed-Your-Dog-in-Winters-900x600.jpg",
    },
  ];

  return (
    <>
    
      <Navbar></Navbar>

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
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md"
            />

            <h3 className="text-xl font-semibold text-gray-800 mt-4">
              {product.name}
            </h3>

            <p className="text-green-700 font-medium mt-1">{product.price}</p>

            <span className="text-sm mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full w-fit">
              {product.category}
            </span>

            <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              View Details
            </button>
          </div>
        ))}
      </div>
    </section>

     <Footer></Footer>
   
    </>

  );
}
