"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Card from "../component/Card";
import WhyChooseUs from "../component/WhyChooseUs";
import AboutSection from "../component/AboutUs";
import Testimonials from "../component/Customer";
import backgroundImg from "../../../public/Vinita_Featured-Image.png";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("https://task-server-lovat.vercel.app/items");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch:", error);
      }
    }

    loadData();
  }, []);

  return (
    <>
      <section className="w-full min-h-[80vh] flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-green-50 to-white">

        {/* HERO SECTION */}
        <section
          className="relative w-full min-h-[85vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImg.src})` }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-brightness-75"></div>

          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center animate-fadeInUp opacity-0">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-10 shadow-xl">

              <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-4">
                Khan Agro
              </h1>

              <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                Delivering the freshest organic vegetables, fruits, dairy, and fisheries —
                straight from trusted local farms to your doorstep.
              </p>

              <div className="flex justify-center gap-4 mt-8">
                <Link
                  href="/products"
                  className="px-8 py-3 bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 transition transform hover:scale-105"
                >
                  Explore Products
                </Link>

                <Link
                  href="/about"
                  className="px-8 py-3 border-2 border-white text-white rounded-xl hover:bg-white/20 transition transform hover:scale-105"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCTS SECTION */}
        <section className="w-full max-w-5xl mt-20 px-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Best Products!
          </h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.length > 0 ? (
              posts.map((post) => <Card key={post._id} post={post} />)
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                Loading...
              </p>
            )}
          </ul>
        </section>

        <section className="w-full max-w-5xl mt-20 px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Happy Families</div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Local Farms</div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-gray-600">Organic</div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">24h</div>
              <div className="text-gray-600">Fresh Delivery</div>
            </div>
          </div>
        </section>

        <WhyChooseUs />
        <AboutSection />
        <Testimonials />


        <section className="w-full mt-20 bg-gradient-to-r from-green-600 to-emerald-700 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Fresh With Our Newsletter
            </h2>
            <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
              Get weekly updates on seasonal produce, special offers, and farm news
            </p>

            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-6 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="px-8 py-3 bg-white text-green-700 font-semibold rounded-xl hover:bg-gray-100 transition transform hover:scale-105">
                Subscribe
              </button>
            </div>

            <p className="text-green-200 text-sm mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </section>

      </section>
    </>
  );
}
