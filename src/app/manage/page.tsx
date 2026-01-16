"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { isSimplyAuthenticated } from "../cookie-auth";
import RemoveOrderButton from "../component/RemoveOrderButton";
import Footer from "../component/Footer";
import Link from "next/link";

interface Product {
  _id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  price?: number;
}

interface Order {
  _id: string;
  productId: number;
  quantity: number;
  date: string;
}

export default function ManagePage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<{ [key: number]: Product }>({});
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Check authentication
  useEffect(() => {
    const checkAuth = () => {
      const simpleAuth = isSimplyAuthenticated();
      const nextAuth = status === 'authenticated';
      
      if (!simpleAuth && !nextAuth) {
        if (status === 'unauthenticated') {
          router.push("/check");
        }
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [status, router]);

  // Load orders
  async function loadOrders() {
    const res = await fetch("https://task-server-lovat.vercel.app/orders");
    const data = await res.json();
    setOrders(data);

    const productIds = data.map((o: Order) => o.productId);
    const productPromises = productIds.map((id: number) =>
      fetch(`https://task-server-lovat.vercel.app/item/${id}`).then((res) => res.json())
    );
    const productData = await Promise.all(productPromises);

    const productMap: { [key: number]: Product } = {};
    productData.forEach((p) => {
      productMap[p._id] = p;
    });
    setProducts(productMap);
  }

  useEffect(() => {
    if (!loading) {
      loadOrders();
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="w-full min-h-screen bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-green-700 mb-6">
            Manage Your Cart
          </h1>

          <div className="bg-white shadow rounded-xl p-6 space-y-6">
            {orders.length === 0 ? (
              <div className="text-center py-20">
                <h2 className="text-2xl font-semibold text-gray-700">
                  Your cart is empty
                </h2>
                <p className="text-gray-500 mt-2">
                  Browse our products and add your favorite items to the cart.
                </p>

                <Link
                  href="/"
                  className="inline-block mt-6 px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                >
                  Return to Home
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const product = products[order.productId];
                  if (!product) return null;

                  return (
                    <div
                      key={order._id}
                      className="flex flex-col md:flex-row items-center justify-between border p-4 rounded-lg gap-4"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-32 h-24 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {product.title}
                        </h3>
                        <p className="text-gray-700">{product.description}</p>
                        <span className="text-sm text-green-700 font-medium">
                          {product.category}
                        </span>
                        <p className="text-gray-400 text-sm mt-1">
                          Ordered on: {new Date(order.date).toLocaleString()}
                        </p>
                        <p className="text-gray-600 mt-1">
                          Quantity: {order.quantity}
                        </p>
                      </div>

                      <RemoveOrderButton
                        orderId={order._id}
                        onRemoved={loadOrders}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {orders.length > 0 && (
              <div className="mt-8 text-center">
                <Link
                  href="/"
                  className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Return to Home
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}