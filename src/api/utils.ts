const getAuthHeader = () => {
  const token = localStorage.getItem("userToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  try {
    const headers = {
      ...options.headers,
      ...getAuthHeader(),
      "Content-Type": "multipart/form-data",
    } as Record<string, string>;

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Request failed");
    }

    return response.json();
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};
