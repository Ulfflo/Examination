// CartPage.tsx
"use client";

import { useCart } from "../contexts/cartContext";
import { useRouter } from "next/navigation";
import { createOrder } from "../api/orderApi";
import { useTenant } from "../contexts/tenantContext";
import { useState } from "react";
import Image from "next/image";

export default function CartPage() {
  const { cartItems, updateQuantity, getTotalPrice } = useCart();
  const { apiKey, tenantId, loading } = useTenant();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    if (!apiKey || !tenantId) {
      setError("API-nyckel eller tenant-ID saknas.");
      return;
    }

    const itemIds = cartItems.map((item) => item.id);

    try {
      const orderData = await createOrder(tenantId, itemIds, apiKey);
      if (orderData && orderData.id && orderData.eta !== undefined) {
        router.push(`/eta?id=${orderData.id}&eta=${orderData.eta}`);
      } else {
        setError("Kunde inte skapa order. Försök igen senare.");
      }
    } catch (err) {
      setError("Kunde inte skapa order. Försök igen senare.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <main className="flex flex-col px-4 pb-6 bg-[#EEEEEE] min-h-screen">
      <header className="flex justify-end mt-4 mb-8">
        <Image src="/cart btn.png" alt="cart image" width={64} height={64} />
      </header>
      <div>
        <ul className="mb-12">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="flex justify-between py-4 border-b border-dotted border-[rgba(53,49,49,0.3)] last:border-b-0"
            >
              <div className="flex flex-col w-full">
                <div className="flex justify-between">
                  <h3 className="text-[22px] text-[#353131] font-bold uppercase">
                    {item.name}
                  </h3>
                  <div className="border-b-2 border-dotted border-[#353131] mx-2 flex-grow relative -top-1" />
                  <p className="text-[22px] font-bold text-[#353131]">
                    {item.price * item.quantity} SEK
                  </p>
                </div>
                <div className="flex items-center mt-1">
                  <div className="flex items-center mt-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-[#353131] bg-shade-24-dark rounded-full w-6 h-6 flex justify-center mr-2"
                    >
                      +
                    </button>
                    <span className="text-[#353131] text-sm font-medium">
                      {item.quantity} stycken
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="text-[#353131] bg-shade-24-dark rounded-full w-6 h-6 flex justify-center ml-2"
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

       
        <div style={{ height: "2rem" }}></div>

        <div className="bg-shade-24-dark text-[#353131] p-4 rounded-[4px] mb-4 flex justify-between items-center">
          <div>
            <h2 className="text-[22px] font-bold">TOTALT</h2>
            <p className="text-sm font-medium">inkl 20% moms</p>
          </div>
          <p className="text-[32px] font-bold">{getTotalPrice()} SEK</p>
        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-[#353131] text-[#F4F3F1] text-opacity-90 px-4 py-6 rounded-[4px] text-2xl font-bold"
        >
          TAKE MY MONEY!
        </button>

        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      </div>
    </main>
  );
}
