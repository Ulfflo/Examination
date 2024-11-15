// components/MenuSection.tsx

import { MenuSectionProps } from "../types";


export function MenuSection({
  title,
  price,
  items,
  clickedItemIds,
  onCardClick,
  textTransform,
}: MenuSectionProps) {
  return (
    <div className="bg-[#605858] p-4 mb-4 rounded-lg shadow-md">
      <div className="flex justify-between">
        <h2 className="text-[22px] font-bold mb-2">{title}</h2>
        <div className="flex-grow border-b-2 border-dotted border-[rgba(244,243,241,0.9)] mx-2 relative -top-3" />
        <p className="text-[22px] font-bold">{price} SEK</p>
      </div>
      <div className="flex flex-wrap gap-4 mt-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onCardClick(item)}
            style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)" }}
            className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap overflow-hidden ${
              clickedItemIds.includes(item.id)
                ? "bg-[#353131]"
                : "bg-shade-24-light"
            } ${textTransform === "lowercase" ? "lowercase" : ""} ${
              textTransform === "uppercase" ? "uppercase" : ""
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MenuSection;
