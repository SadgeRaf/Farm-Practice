import Footer from "../component/Footer";
import Navbar from "../component/Navbar";

export default function AboutPage() {
  return (
    <>
     <Navbar></Navbar>
     <section className="px-6 py-16 bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-green-800">
          About Khan Agro
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mt-4">
          Delivering fresh, organic, and chemical-free foods straight from local
          farms to your home.
        </p>
      </div>

      {/* Who We Are */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center mb-20">
        <img
          src="https://i.postimg.cc/8cL7SYm7/Feed-Your-Dog-in-Winters-900x600.jpg"
          alt="Farm"
          className="rounded-xl shadow-lg object-cover w-full h-80"
        />

        <div>
          <h2 className="text-3xl font-semibold text-green-700 mb-4">
            Who We Are
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Khan Agro is a passionate initiative focused on providing fresh,
            organic, and locally sourced vegetables, fruits, dairy, and
            fisheries products. Our mission is to connect consumers with clean
            and healthy food — grown sustainably and delivered with care.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 mb-20">
        <div className="bg-white p-8 rounded-xl shadow">
          <h3 className="text-2xl font-bold text-green-700 mb-3">Our Mission</h3>
          <p className="text-gray-700 leading-relaxed">
            To promote healthy living by offering high-quality organic products
            while supporting local farmers and sustainable agriculture.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow">
          <h3 className="text-2xl font-bold text-green-700 mb-3">Our Vision</h3>
          <p className="text-gray-700 leading-relaxed">
            To become a trusted household name for organic foods in Bangladesh,
            ensuring everyone has access to clean and fresh produce.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-semibold text-green-800">
          Why Choose Khan Agro?
        </h2>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h4 className="text-xl font-semibold text-green-700 mb-2">
            100% Fresh & Organic
          </h4>
          <p className="text-gray-600">
            All our products are sourced directly from trusted farms.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h4 className="text-xl font-semibold text-green-700 mb-2">
            Farm-to-Home Delivery
          </h4>
          <p className="text-gray-600">
            We ensure your food reaches you quickly and safely.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h4 className="text-xl font-semibold text-green-700 mb-2">
            Supporting Local Farmers
          </h4>
          <p className="text-gray-600">
            Every purchase helps local communities grow and thrive.
          </p>
        </div>
      </div>
    </section>
    <Footer></Footer>
    </>
  );
}
