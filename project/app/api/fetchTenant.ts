export const fetchTenant = async (apiKey: string): Promise<string | null> => {
  try {
    
    const response = await fetch(
      "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/tenants",
      {
        method: "POST",
        headers: {
          "x-zocom": apiKey, 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: "ulffloden" }), 
      }
    );

  
    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Server responded with an error:", errorResponse);
      console.error("Status code:", response.status); 
      throw new Error(errorResponse.message || "Failed to fetch tenant");
    }

    
    const data = await response.json();
    console.log("Tenant fetch successful, received data:", data);

    return data.id; 
  } catch (error) {
    console.error("Failed to fetch tenant:", error);
    return null;
  }
};
