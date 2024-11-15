export type MenuItem = {
  id: number;
  type: string;
  name: string;
  description: string;
  price: number;
  ingredients?: string[];
};

export type MenuSectionProps = {
  title: string;
  price: number;
  items: MenuItem[];
  clickedItemIds: number[];
  onCardClick: (item: MenuItem) => void;
  textTransform?: "uppercase" | "lowercase";
};

export type ReceiptItem = {
  id: number;
  name: string;
  type: string;
  price: number;
};

export type Receipt = {
  id: string;
  timestamp: string;
  items: ReceiptItem[];
};

export type CreateOrderResponse = {
  id: string;
  eta: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  getTotalPrice: () => number;
  clearCart: () => void;
};

export type TenantContextType = {
  apiKey: string | null;
  tenantId: string | null;
  loading: boolean;
}

export type LinkButtonProps = {
  href: string;
  text: string;
  onClick?: () => void;
  className?: string;
};