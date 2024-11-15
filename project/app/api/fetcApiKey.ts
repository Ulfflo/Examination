

export const fetchApiKey = async (): Promise<string | null> => {
  try {
    const response = await fetch(
      "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/keys",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to fetch API key");
    }

    const data = await response.json();
    return data.key;
  } catch (error) {
    console.error("Failed to fetch API key:", error);
    return null;
  }
};
