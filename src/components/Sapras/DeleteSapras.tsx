import React from "react";
import { useDeleteSarana } from "../../hooks/useSapras";

interface DeleteSaranaProps {
  id: string;
}

const DeleteSarana: React.FC<DeleteSaranaProps> = ({ id }) => {
  const { mutate, isPending } = useDeleteSarana();

  const handleDelete = () => {
    mutate(id);
  };

  return (
    <button onClick={handleDelete} disabled={isPending}>
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteSarana;
