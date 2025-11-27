import { auth } from "@/app/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ItemDetailPage({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) redirect("/check");

  const { id } = params;

  // Fetch from your backend API
  const res = await fetch(`http://localhost:5000/items/${id}`, {
    cache: "no-store",
  });

  const product = await res.json();

  if (!product?._id) {
    return (
      <section className="px-6 py-16 text-center">
        <h1 className="text-3xl font-bold text-red-600">Product Not Found</h1>
        <Link
          href="/products"
          className="mt-6 inline-block bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Go Back
        </Link>
      </section>
    );
  }

  return (
    <section className="px-6 py-16 max-w-4xl mx-auto">
      {/* Back Button */}
      <Link
        href="/products"
        className="inline-block mb-6 text-green-600 hover:text-green-800 font-medium"
      >
        ← Back to Products
      </Link>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-72 object-cover"
        />

        <div className="p-6 space-y-4">
          <span className="text-sm text-green-600 font-medium">
            {product.category}
          </span>

          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>

          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          <p className="text-sm text-gray-400">
            Added:{" "}
            <span className="font-medium">
              {product._createdAt || "Unknown"}
            </span>
          </p>

          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
            Order Now
          </button>
        </div>
      </div>
    </section>
  );
}
