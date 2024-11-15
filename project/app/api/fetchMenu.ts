

import { MenuItem } from "../types"; 

export const fetchMenu = async (apiKey: string): Promise<MenuItem[] | null> => {
  try {
    const response = await fetch(
      "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu",
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
      throw new Error(errorResponse.message || "Failed to fetch menu");
    }

    const data = await response.json();
    return data.items || []; 
  } catch (error) {
    console.error("Failed to fetch menu:", error);
    return null;
  }
};
