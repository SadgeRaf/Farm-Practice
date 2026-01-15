"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
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
  status?: string;
}

export default function ManagePage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<{ [key: number]: Product }>({});
  const [ordersLoading, setOrdersLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/check");
    }
  }, [status, router]);

  // Load orders
  async function loadOrders() {
    setOrdersLoading(true);
    try {
      const res = await fetch("http://localhost:5000/orders");
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data);

      // Fetch product details for each order
      const uniqueProductIds = [...new Set(data.map((o: Order) => o.productId))];
      const productPromises = uniqueProductIds.map((id: number) =>
        fetch(`http://localhost:5000/item/${id}`).then((res) => {
          if (!res.ok) throw new Error(`Failed to fetch product ${id}`);
          return res.json();
        })
      );
      const productData = await Promise.all(productPromises);

      const productMap: { [key: number]: Product } = {};
      productData.forEach((p) => {
        productMap[p._id] = p;
      });
      setProducts(productMap);
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setOrdersLoading(false);
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      loadOrders();
    }
  }, [status]);

  // Calculate total
  const calculateTotal = () => {
    return orders.reduce((total, order) => {
      const product = products[order.productId];
      const price = product?.price || 10;
      return total + (price * order.quantity);
    }, 0);
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <>
      <section className="w-full min-h-screen bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-green-700 mb-2">
              Manage Your Cart
            </h1>
            <p className="text-gray-600">
              View, manage, and track your current orders
            </p>
          </div>

          {ordersLoading ? (
            <div className="bg-white shadow rounded-xl p-8 text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white shadow rounded-xl p-8 space-y-6 text-center">
              <div className="text-gray-400 text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-semibold text-gray-700">
                Your cart is empty
              </h2>
              <p className="text-gray-500 max-w-md mx-auto">
                Browse our fresh products and add your favorite items to the cart.
              </p>

              <div className="pt-4">
                <Link
                  href="/"
                  className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition transform hover:scale-105"
                >
                  Browse Products
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Order Summary */}
              <div className="mb-6 bg-white shadow rounded-xl p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Order Summary
                    </h2>
                    <p className="text-gray-600">
                      {orders.length} item{orders.length !== 1 ? 's' : ''} in your cart
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-2xl font-bold text-green-700">
                      ${calculateTotal().toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Orders List */}
              <div className="bg-white shadow rounded-xl p-6 space-y-6">
                <div className="space-y-4">
                  {orders.map((order) => {
                    const product = products[order.productId];
                    if (!product) return null;

                    const price = product?.price || 10;
                    const subtotal = price * order.quantity;

                    return (
                      <div
                        key={order._id}
                        className="flex flex-col md:flex-row items-start md:items-center justify-between border border-gray-200 p-4 rounded-lg gap-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start gap-4 flex-1">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-32 h-24 object-cover rounded-md shadow-sm"
                          />
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                              <h3 className="text-xl font-semibold text-gray-800">
                                {product.title}
                              </h3>
                              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                                {product.category}
                              </span>
                            </div>
                            <p className="text-gray-700 mt-2 line-clamp-2">
                              {product.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
                              <p className="text-gray-600">
                                <span className="font-medium">Quantity:</span> {order.quantity}
                              </p>
                              <p className="text-gray-600">
                                <span className="font-medium">Price:</span> ${price.toFixed(2)}
                              </p>
                              <p className="text-green-700 font-semibold">
                                <span className="font-medium">Subtotal:</span> ${subtotal.toFixed(2)}
                              </p>
                            </div>
                            <p className="text-gray-400 text-sm mt-2">
                              Ordered on: {new Date(order.date).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>

                        <RemoveOrderButton
                          orderId={order._id}
                          onRemoved={loadOrders}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-gray-600 text-sm">
                    Need help? <Link href="/contact" className="text-green-600 hover:text-green-700 font-medium">Contact Support</Link>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/"
                      className="px-6 py-2 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition"
                    >
                      Continue Shopping
                    </Link>
                    <button
                      onClick={() => {
                        alert("Checkout functionality coming soon!");
                      }}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition transform hover:scale-105"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
                  <div className="text-green-600 text-2xl mb-2">🚚</div>
                  <h3 className="font-semibold text-gray-800 mb-2">Free Delivery</h3>
                  <p className="text-sm text-gray-600">
                    Orders over $50 qualify for free delivery
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
                  <div className="text-green-600 text-2xl mb-2">🔄</div>
                  <h3 className="font-semibold text-gray-800 mb-2">Easy Returns</h3>
                  <p className="text-sm text-gray-600">
                    7-day return policy on all products
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
                  <div className="text-green-600 text-2xl mb-2">📞</div>
                  <h3 className="font-semibold text-gray-800 mb-2">Need Help?</h3>
                  <p className="text-sm text-gray-600">
                    Call us at (555) 123-4567
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}