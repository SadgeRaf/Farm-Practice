import { redirect } from "next/navigation";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import { auth } from "../auth";

export default async function ManagePage() {

  const session = await auth();
  
    if(!session) redirect('/check');

  return (
    <>
     <Navbar></Navbar>
     <section className="w-full min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Page Heading */}
        <h1 className="text-4xl font-bold text-green-700 mb-6">
          Manage Your Cart
        </h1>

        <p className="text-gray-600 mb-10">
          Review your selected items, update quantities, or remove products before checkout.
        </p>

        {/* Cart Container */}
        <div className="bg-white shadow rounded-xl p-6 space-y-6">

          {/* Empty Cart State (You can replace this with dynamic content later) */}
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-700">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mt-2">
              Browse our products and add your favorite items to the cart.
            </p>

            <a
              href="/products"
              className="inline-block mt-6 px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
            >
              Browse Products
            </a>
          </div>

        </div>

      </div>
    </section>
    <Footer></Footer>
    </>
  );
}
