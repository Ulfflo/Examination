"use client";

import LinkButton from "../components/LinkButton";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { fetchReceipt } from "../api/orderApi";
import { useTenant } from "../contexts/tenantContext";
import { useCart } from "../contexts/cartContext";
import { Receipt } from "../types";


export default function ReceiptPage() {
  const { apiKey, loading } = useTenant();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { cartItems, clearCart } = useCart(); 

  useEffect(() => {
    const getReceipt = async () => {
      if (!orderId) {
        setError("Order ID is missing.");
        return;
      }
      if (!apiKey || loading) {
        return;
      }

      try {
        const receiptData = await fetchReceipt(orderId, apiKey);
        setReceipt(receiptData);
      } catch (error) {
        setError("Failed to fetch receipt.");
      }
    };

    getReceipt();
  }, [orderId, apiKey, loading]);

  if (error) return <p>{error}</p>;

  
  const getItemQuantity = (id: number) => {
    const cartItem = cartItems.find((item) => item.id === id);
    return cartItem ? cartItem.quantity : 1;
  };


  const calculateTotalPrice = () => {
    return receipt?.items.reduce((total, item) => {
      const quantity = getItemQuantity(item.id);
      return total + item.price * quantity;
    }, 0);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#605858] px-6 pt-[165px] pb-4 w-full">
      {receipt ? (
        <div className="bg-[#F4F3F1] text-[#353131] rounded-[4px] shadow-lg w-full relative">
         
          <div className="flex justify-center pt-6">
            <Image src="/logo.png" alt="Logo" width={41.74} height={50.17} />
          </div>

         
          <h2 className="text-center text-2xl font-bold tracking-widest mt-2">
            KVITTO
          </h2>
          <p className="text-center text-xs text-[#605858] font-bold tracking-widest mb-6 uppercase">
            #{receipt.id}
          </p>

        
          <ul className="px-4 space-y-3 mb-6">
            {receipt.items.map((item) => {
              const quantity = getItemQuantity(item.id);
              return (
                <li key={item.id} className="flex flex-col">
                  <div className="flex justify-between w-full">
                  
                    <p className="text-base font-bold uppercase">{item.name}</p>
                    <div className="flex-grow border-b-2 border-dotted border-[#353131] relative -top-1 mx-2" />
                    <p className="text-base font-bold">
                      {item.price * quantity} SEK
                    </p>
                  </div>
                  
                  <p className="text-xs mt-[-4px]">{quantity} stycken</p>
                </li>
              );
            })}
          </ul>

         
          <div className="flex justify-between items-center bg-[#353131] bg-opacity-[0.24] p-4 rounded-b-[4px]">
            <div>
              <h3 className="text-base font-bold">TOTALT</h3>
              <p className="text-xs">inkl 20% moms</p>
            </div>
            <p className="text-2xl font-bold">{calculateTotalPrice()} SEK</p>
          </div>
        </div>
      ) : (
        <p className="text-[#F4F3F1]">Laddar kvitto...</p>
      )}

      
      <div className="mt-[73px] w-full">
        <LinkButton
          href="/"
          text="GÖR EN NY BESTÄLLNING"
          onClick={() => clearCart()}
          className="text-[#F4F3F1F0] text-opacity-[0.94] bg-[#353131]"
        />
      </div>
    </main>
  );
}
