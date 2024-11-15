

import { useState } from "react";
import { MenuItem } from "../types";
import { useCart } from "../contexts/cartContext";
import MenuSection from "./MenuSection";

interface MenuListProps {
  menu: MenuItem[];
}

export function MenuList({ menu }: MenuListProps) {
  const { addToCart } = useCart();
  const [clickedItemIds, setClickedItemIds] = useState<number[]>([]);

  const wontonItems = menu.filter((item) => item.type === "wonton");
  const dipItems = menu.filter((item) => item.type === "dip");
  const drinkItems = menu.filter((item) => item.type === "drink");

  const handleCardClick = (item: MenuItem) => {
    addToCart(item);
    setClickedItemIds((prevIds) =>
      prevIds.includes(item.id) ? prevIds : [...prevIds, item.id]
    );
  };

  return (
    <div className="text-[#F4F3F1] text-opacity-90 text-shadow-custom-blur mx-4">
      
      <div className="bg-[#605858] mb-4 rounded-lg overflow-hidden">
        {wontonItems.length > 0 ? (
          <ul className="grid">
            {wontonItems.map((item, index) => (
              <li
                key={item.id}
                onClick={() => handleCardClick(item)}
                className={`p-4 cursor-pointer ${
                  clickedItemIds.includes(item.id)
                    ? "bg-[#353131]"
                    : "bg-[#605858]"
                } ${
                  index < wontonItems.length - 1
                    ? "border-b border-dotted border-[rgba(244,243,241,0.5)]"
                    : ""
                }`}
              >
                <div className="flex justify-between">
                  <h3 className="text-[22px] font-bold uppercase">
                    {item.name}
                  </h3>
                  <div className="flex-grow border-b-2 border-dotted border-[rgba(244,243,241,0.9)] mx-2 relative -top-1" />
                  <p className="text-[22px] font-bold">{item.price} SEK</p>
                </div>
                <p className="text-sm font-medium mt-2">
                  {(item.ingredients ?? []).join(", ")}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="p-4">No wonton items available.</p>
        )}
      </div>

     
      <MenuSection
        title="DIPSÅS"
        price={19}
        items={dipItems}
        clickedItemIds={clickedItemIds}
        onCardClick={handleCardClick}
        textTransform="lowercase"
      />

      
      <MenuSection
        title="DRICKA"
        price={19}
        items={drinkItems}
        clickedItemIds={clickedItemIds}
        onCardClick={handleCardClick}
      />
    </div>
  );
}

export default MenuList;
