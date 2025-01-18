import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBerita } from "../api/galeriApi";

export const useGetBerita = () => {
  return useQuery({ queryKey: ["galeri"], queryFn: getBerita });
};

export const useCreateGaleri = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("authToken");

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch(
        `https://api.smkpluspnb.sch.id/api/api/v1/galeri/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
          body: formData,
          // mode: "cors",
          // credentials: 'include',
          // redirect: 'follow',
        },
      );

      // Handle redirect manually if needed
      if (response.status === 302) {
        const redirectUrl = response.headers.get("location");
        throw new Error(
          `Redirect received. Please check authentication. Redirect URL: ${redirectUrl}`,
        );
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create berita: ${errorText}`);
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["berita"] });
    },
  });
};

export const useUpdateGaleri = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("authToken"); // Ambil token dari local storage

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      const response = await fetch(
        `https://api.smkpluspnb.sch.id/api/api/v1/galeri/update/${id}`,
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
      queryClient.invalidateQueries({ queryKey: ["galeri"] }); // Invalidate cache setelah berhasil
    },
  });
};

export const useDeleteGaleri = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("authToken"); // Ambil token dari local storage

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(
        `https://api.smkpluspnb.sch.id/api/api/v1/galeri/delete/${id}`,
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
      queryClient.invalidateQueries({ queryKey: ["galeri"] }); // Invalidate cache setelah berhasil
    },
  });
};
