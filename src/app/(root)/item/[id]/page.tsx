import { auth } from "@/app/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const fakeData = [
  {
    _id: 1,
    title: "Cucumbers",
    category: "Vegetable",
    description:
      "Fresh organic cucumbers grown naturally without chemicals. Perfect for salads and daily meals.",
    image: "https://i.postimg.cc/8cL7SYm7/Feed-Your-Dog-in-Winters-900x600.jpg",
    _createdAt: "Yesterday",
  },
  {
    _id: 2,
    title: "Fresh Tomatoes",
    category: "Vegetable",
    description:
      "Juicy red tomatoes loaded with nutrients and grown using sustainable farming practices.",
    image: "https://i.postimg.cc/8cL7SYm7/Feed-Your-Dog-in-Winters-900x600.jpg",
    _createdAt: "Yesterday",
  },
  {
    _id: 3,
    title: "Organic Milk",
    category: "Dairy",
    description:
      "Pure and fresh organic milk sourced from healthy farm cows. No preservatives added.",
    image: "https://i.postimg.cc/8cL7SYm7/Feed-Your-Dog-in-Winters-900x600.jpg",
    _createdAt: "Today",
  },
];

export default async function ItemDetailPage({ params }: { params: { id: string } }) {
  const session = await auth();

  if(!session) redirect('/check');
  
  const itemId = Number(params.id);

  const product = fakeData.find((p) => p._id === itemId);

  if (!product) {
    return (
      <section className="px-6 py-16 text-center">
        <h1 className="text-3xl font-bold text-red-600">Product Not Found</h1>
        <Link
          href="/"
          className="mt-6 inline-block bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Go Back Home
        </Link>
      </section>
    );
  }

  return (
    <section className="px-6 py-16 max-w-4xl mx-auto">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-block mb-6 text-green-600 hover:text-green-800 font-medium"
      >
        ← Back to Home
      </Link>

      {/* Content */}
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
            Added: <span className="font-medium">{product._createdAt}</span>
          </p>

          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
            Order Now
          </button>
        </div>
      </div>
    </section>
  );
}
