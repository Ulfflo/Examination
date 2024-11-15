
"use client";

import { useState, useEffect } from "react";
import { fetchApiKey } from "./api/fetcApiKey";
import { fetchMenu } from "./api/fetchMenu";
import MenuList from "./components/MenuList";
import { MenuItem } from "./types";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "./contexts/cartContext"; 
import { Fira_Mono } from "next/font/google";

const firaMono = Fira_Mono({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Home() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const { cartItems } = useCart(); 

  
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = await fetchApiKey();
      if (apiKey) {
        setApiKey(apiKey);
      } else {
        setError("Failed to fetch API key");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!apiKey) return;
      const menu = await fetchMenu(apiKey);
      if (menu) {
        setMenu(menu);
      } else {
        setError("Failed to fetch menu");
      }
      setLoading(false);
    };

    fetchData();
  }, [apiKey]);

  return (
    <main className="bg-[#489078] min-h-screen mb-36">
      <nav className="flex justify-end">
        <Link href="/cart">
          <div className="relative inline-block mr-4 my-4">
            <Image
              src="/cart btn.png"
              alt="cart button"
              width={64}
              height={64}
              className="bg-[#F4F3F1] rounded-[4px]"
              style={{ boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.1)" }}
            />
            {itemCount > 0 && (
              <span
                style={{ textShadow: "0px 0px 2px rgba(0, 0, 0, 0.2)" }}
                className={`${firaMono.className} absolute top-0 right-0 bg-[#EB5757]  text-[#F4F3F1] rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold transform translate-x-1/4 -translate-y-1/3`}
              >
                {itemCount}
              </span>
            )}
          </div>
        </Link>
      </nav>
      <h1 className="ml-4 text-[32px] font-bold text-[#F4F3F1] opacity-90 text-shadow-custom">
        MENY
      </h1>
      {loading && <p>Loading menu...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <MenuList menu={menu} />
    </main>
  );
}
