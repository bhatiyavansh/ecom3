"use client";

import { useEffect, useState } from "react";

export default function BuyerDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const buyerId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleBid = async (productId: string, amount: number) => {
    try {
      const res = await fetch("/api/bids", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, buyerId, amount }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      alert("Bid placed successfully!");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-green-100 text-black">
      <h1 className="text-2xl font-bold text-center mb-6">Active Auctions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p>{product.description}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Price: ₹{product.price}</p>
            <p>Seller: {product.seller.name}</p>
            <p>Ends: {new Date(product.auction.endTime).toLocaleString()}</p>
            <input
              type="number"
              placeholder="Your bid"
              className="mt-2 p-2 border w-full text-black"
              onBlur={(e) => {
                const amount = parseFloat(e.target.value);
                if (!isNaN(amount)) {
                  handleBid(product.id, amount);
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
