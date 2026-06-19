"use client";
import { useState } from "react";

export default function BuyButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  async function buy() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ id, quantity: 1 }] }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // hand off to Stripe Checkout
      } else {
        console.error(data.error ?? "Checkout failed");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <button type="button" className="add" onClick={buy} disabled={loading}>
      {loading ? "Redirecting…" : "Add to bag"}
    </button>
  );
}
