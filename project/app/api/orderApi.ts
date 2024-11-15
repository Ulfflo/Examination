
import { CreateOrderResponse, Receipt } from "../types";

export const createOrder = async (
  tenantId: string,
  itemIds: number[],
  apiKey: string
): Promise<CreateOrderResponse | null> => {
  try {
    const response = await fetch(
      `https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/${tenantId}/orders`,
      {
        method: "POST",
        headers: {
          "x-zocom": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: itemIds }),
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Error creating order:", errorResponse);
      throw new Error(errorResponse.message || "Failed to create order");
    }

    const data = await response.json();
    console.log("Order created successfully:", data);

    
    const { id, eta } = data.order || {};

    if (id && eta) {
      return { id, eta } as CreateOrderResponse; 
    } else {
      console.error("Order data is missing id or eta:", data);
      return null;
    }
  } catch (error) {
    console.error("Failed to create order:", error);
    return null;
  }
};




export const fetchReceipt = async (
  orderId: string,
  apiKey: string
): Promise<Receipt | null> => {
  try {
    const response = await fetch(
      `https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/receipts/${orderId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-zocom": apiKey,
        },
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Error fetching receipt:", errorResponse);
      throw new Error(errorResponse.message || "Failed to fetch receipt");
    }

    const data = await response.json();

    
    const receiptData: Receipt = data.receipt || data;
    console.log("Receipt fetched successfully:", receiptData);
    return receiptData;
  } catch (error) {
    console.error("Failed to fetch receipt:", error);
    return null;
  }
};

