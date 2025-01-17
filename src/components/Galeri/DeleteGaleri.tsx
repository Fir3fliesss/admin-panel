import React from "react";
import { useDeleteGaleri } from "../../hooks/useGaleri";

interface DeleteGaleriProps {
  id: string;
}

const DeleteGaleri: React.FC<DeleteGaleriProps> = ({ id }) => {
  const { mutate, isPending } = useDeleteGaleri();

  const handleDelete = () => {
    mutate(id);
  };

  return (
    <button onClick={handleDelete} disabled={isPending}>
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteGaleri;
