import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSarana } from "../api/saprasApi";

export const useGetSarana = () => {
  return useQuery({ queryKey: ["sarana"], queryFn: getSarana });
};

export const useCreateSarana = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("authToken");

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch(
        `https://api.smkpluspnb.sch.id/api/api/v1/sarana/create`,
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
        throw new Error(`Failed to create sarana: ${errorText}`);
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sarana"] });
    },
  });
};

export const useUpdateSarana = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("authToken"); // Ambil token dari local storage

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      const response = await fetch(
        `https://api.smkpluspnb.sch.id/api/api/v1/sarana/update/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Tambahkan token ke header
          },
          body: data,
        },
      );
      if (!response.ok) throw new Error("Failed to update sarana");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sarana"] }); // Invalidate cache setelah berhasil
    },
  });
};

export const useDeleteSarana = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("authToken"); // Ambil token dari local storage

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(
        `https://api.smkpluspnb.sch.id/api/api/v1/sarana/delete/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Tambahkan token ke header
          },
        },
      );
      if (!response.ok) throw new Error("Failed to delete sarana");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sarana"] }); // Invalidate cache setelah berhasil
    },
  });
};
