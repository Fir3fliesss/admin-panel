import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getBerita,
} from "../api/beritaApi";

export const useGetBerita = () => {
  return useQuery({ queryKey: ["berita"], queryFn: getBerita });
};

export const useCreateBerita = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("USER_TOKEN"); // Ambil token dari local storage

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/v1/berita/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Tambahkan token ke header
          },
          body: formData,
        },
      );
      if (!response.ok) throw new Error("Failed to create berita");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["berita"] }); // Invalidate cache setelah berhasil
    },
  });
};

export const useUpdateBerita = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("USER_TOKEN"); // Ambil token dari local storage

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/v1/berita/update/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`, // Tambahkan token ke header
          },
          body: data,
        },
      );
      if (!response.ok) throw new Error("Failed to update berita");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["berita"] }); // Invalidate cache setelah berhasil
    },
  });
};

export const useDeleteBerita = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("USER_TOKEN"); // Ambil token dari local storage

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/v1/berita/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Tambahkan token ke header
          },
        },
      );
      if (!response.ok) throw new Error("Failed to delete berita");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["berita"] }); // Invalidate cache setelah berhasil
    },
  });
};
