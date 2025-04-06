"use client";

import { useEffect, useState } from "react";

export default function SellerDashboard() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      console.log(data);
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleAcceptBid = async (bidId: string) => {
    const res = await fetch("/api/bids/accept", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bidId }),
    });
    const data = await res.json();
    if (data.success) {
      alert("Bid accepted. Auction completed.");
      location.reload();
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100 text-black">
      <h1 className="text-2xl font-bold text-center mb-6">
        Your Products and Bids
      </h1>
      <div className="space-y-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <p>{product.description}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Price: ₹{product.price}</p>
            <p>Auction Status: {product.auction?.status}</p>

            {product.bids.length > 0 ? (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Bids:</h3>
                <ul className="space-y-2">
                  {product.bids.map((bid: any) => (
                    <li
                      key={bid.id}
                      className="border p-2 rounded-md flex justify-between items-center"
                    >
                      <div>
                        {/* <p>Buyer: {bid.buyer.name}</p> */}
                        <p>Amount: ₹{bid.amount}</p>
                        <p>Status: {bid.status}</p>
                      </div>
                      {bid.status === "PENDING" &&
                        product.auction?.status === "ONGOING" && (
                          <button
                            onClick={() => handleAcceptBid(bid.id)}
                            className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700"
                          >
                            Accept
                          </button>
                        )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-500 mt-2">No bids yet.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
