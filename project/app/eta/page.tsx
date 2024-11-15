"use client"

import LinkButton from "../components/LinkButton";
import { useCart } from "../contexts/cartContext";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function EtaPage() {
  const searchParams = useSearchParams();
  const etaParam = searchParams.get("eta");
  const orderId = searchParams.get("id");
  const { clearCart } = useCart();

  let eta: string | null = null;
  if (etaParam) {
    const etaDate = new Date(etaParam);
    const currentDate = new Date();
    const diffInMinutes = Math.round((etaDate.getTime() - currentDate.getTime()) / (1000 * 60));
    eta = diffInMinutes > 0 ? `${diffInMinutes} MIN` : null;
  }

  return (
    <main className="flex flex-col justify-center items-center w-full min-h-screen bg-[#605858] px-6 pb-4 pt-[97px]">
      <div className="flex flex-col items-center mb-[42px]">
        <Image src="/boxtop.png" alt="Wonton Box" width={390} height={362}  />
        <h2 className="text-[32px] font-bold text-[#F4F3F1] opacity-90 text-center leading-none mb-4">
          DINA WONTONS <br />
          <span className="block mt-2">TILLAGAS!</span>
        </h2>
        <p className="text-[26px] font-medium text-[#F4F3F1] opacity-90 mb-4">ETA {eta}</p>
        <p className="text-[15px] font-medium text-[#EEEEEE] uppercase mt-[-8px]">{orderId}</p>
      </div>
      <div className="flex flex-col space-y-4 w-full">
        <LinkButton
          href={`/receipt?id=${orderId}`}
          text="SE KVITTO"
          className="border-2 opacity-80 border-[#F4F3F1F0] text-[#F4F3F1F0]"
        />
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

