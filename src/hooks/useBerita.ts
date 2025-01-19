import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBerita } from "../api/beritaApi";

export const useGetBerita = () => {
  return useQuery({ queryKey: ["berita"], queryFn: getBerita });
};

export const useCreateBerita = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("authToken");

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch(
        `https://api.smkpluspnb.sch.id/api/api/v1/berita/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      // Handle redirect manually if needed
      if (response.status === 302) {
        const redirectUrl = response.headers.get('location');
        throw new Error(`Redirect received. Please check authentication. Redirect URL: ${redirectUrl}`);
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

export const useUpdateBerita = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("authToken");

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      const response = await fetch(
        `https://api.smkpluspnb.sch.id/api/api/v1/berita/update/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: data,
        },
      );
      console.log("Resp: ", response, "ID: ", id, "Token: ", token);
      console.log("Data: ", data);
      if (!response.ok) throw new Error("Failed to update berita");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["berita"] });
    },
  });
};

export const useDeleteBerita = (p0?: { onSuccess: () => void; }) => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("authToken"); // Ambil token dari local storage

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(
        `https://api.smkpluspnb.sch.id/api/api/v1/berita/delete/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Tambahkan token ke header
          },
        },
      );
      if (!response.ok) throw new Error("Failed to delete berita");
      console.log("Resp: ", response, "ID: ", id);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["berita"] });
    },
  });
};
