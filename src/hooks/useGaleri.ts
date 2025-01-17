import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getGaleri,
  createGaleri,
  updateGaleri,
  deleteGaleri,
} from "../api/galeriApi";
import { Galeri } from "../types/galeri";

/**
 * Hook untuk mendapatkan data galeri.
 */
export const useGetGaleri = () => {
  return useQuery<Galeri[]>({
    queryKey: ["galeri"],
    queryFn: getGaleri,
  });
};

/**
 * Hook untuk membuat galeri baru.
 */
export const useCreateGaleri = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, FormData>({
    mutationFn: createGaleri,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["galeri"] });
    },
  });
};

/**
 * Hook untuk memperbarui galeri.
 */
export const useUpdateGaleri = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, { id: string; data: FormData }>({
    mutationFn: ({ id, data }) => updateGaleri(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["galeri"] });
    },
  });
};

/**
 * Hook untuk menghapus galeri.
 */
export const useDeleteGaleri = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteGaleri,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["galeri"] });
    },
  });
};
