import { useMutation } from "@tanstack/react-query";
import { login, register } from "../api/authApi";
import { useAuthToken } from "./useLocalStorage";

export const useAuth = () => {
  const { token, saveToken, removeToken } = useAuthToken();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const token = data?.data; // Pastikan token ada
      if (token) {
        saveToken(token); // Simpan token
        console.log("Login success:", token);
      } else {
        console.error("No token received");
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
  

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      saveToken(data.token); // Simpan token setelah register berhasil
    },
    onError: (error) => {
      console.error("Registration failed:", error);
      // Anda bisa menambahkan penanganan error khusus di sini
    },
  });

  const logout = () => {
    removeToken(); // Hapus token saat logout
  };

  return {
    token,
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,
    logout,
  };
};
