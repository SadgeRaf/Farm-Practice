"use client";

import { useState } from "react";

export default function RemoveOrderButton({ orderId, onRemoved }: { orderId: string, onRemoved: () => void }) {
  async function removeOrder() {
    try {
      const res = await fetch(`http://localhost:5000/order/${orderId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Order removed successfully!");
        onRemoved(); // callback to refresh the UI
      } else {
        alert("Failed to remove order");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  }

  return (
    <button
      onClick={removeOrder}
      className="text-red-600 hover:text-red-800"
    >
      Remove
    </button>
  );
}
