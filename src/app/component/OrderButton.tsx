"use client";

export default function OrderButton({ id }: { id: number }) {
  async function placeOrder() {
    try {
      const res = await fetch("https://task-server-lovat.vercel.app/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Order placed successfully!");
        window.location.href = "/manage";
      } else {
        alert("Failed to place order");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  }

  return (
    <button
      onClick={placeOrder}
      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
    >
      Order Now
    </button>
  );
}
