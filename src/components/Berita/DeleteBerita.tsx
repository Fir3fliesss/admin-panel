import React from "react";
import { useDeleteBerita } from "../../hooks/useBerita";

interface DeleteBeritaProps {
  id: string;
}

const DeleteBerita: React.FC<DeleteBeritaProps> = ({ id }) => {
  const { mutate, isPending } = useDeleteBerita();

  const handleDelete = () => {
    mutate(id);
  };

  return (
    <button onClick={handleDelete} disabled={isPending}>
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteBerita;
