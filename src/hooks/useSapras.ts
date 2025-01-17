import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSarana,
  createSarana,
  updateSarana,
  deleteSarana,
} from "../api/saprasApi";

export const useGetSarana = () => {
  return useQuery({ queryKey: ["sarana"], queryFn: getSarana });
};

export const useCreateSarana = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSarana,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sarana"] });
    },
  });
};

export const useUpdateSarana = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSarana, // Sekarang updateSarana menerima satu argumen (objek)
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sarana"] });
    },
  });
};

export const useDeleteSarana = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSarana,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sarana"] });
    },
  });
};
