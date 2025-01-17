const BASE_URL = "https://api.smkpluspnb.sch.id/api/api";

/**
 * Fungsi untuk melakukan registrasi pengguna.
 * @param data - Objek berisi `name` dan `password`.
 * @returns Data respons dari server.
 * @throws Error jika registrasi gagal.
 */
export const register = async (data: { name: string; password: string }) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to register");
    }

    return response.json();
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

/**
 * Fungsi untuk melakukan login pengguna.
 * @param data - Objek berisi `name` dan `password`.
 * @returns Data respons dari server (termasuk token).
 * @throws Error jika login gagal.
 */
export const login = async (data: { name: string; password: string }) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to login");
    }

    const result = await response.json();

    if (result.token) {
      localStorage.setItem("userToken", result.token);
    }

    return result;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("userToken");
};
