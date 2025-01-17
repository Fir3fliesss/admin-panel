import React, { useState } from "react";
import { useUpdateSarana } from "../../hooks/useSapras";

interface UpdateSaranaProps {
  id: string;
  initialData: {
    images: string[];
    title: string[];
  };
}

const UpdateSarana: React.FC<UpdateSaranaProps> = ({ id, initialData }) => {
  const [images, setImages] = useState(initialData.images);
  const [titles, setTitles] = useState(initialData.title);
  const { mutate, isPending } = useUpdateSarana();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ id, data: { images, titles } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={images.join(",")}
        onChange={(e) => setImages(e.target.value.split(","))}
        placeholder="Images (comma separated)"
        required
      />
      <input
        type="text"
        value={titles.join(",")}
        onChange={(e) => setTitles(e.target.value.split(","))}
        placeholder="Titles (comma separated)"
        required
      />
      <button type="submit" disabled={isPending}>
        {isPending ? "Updating..." : "Update"}
      </button>
    </form>
  );
};

export default UpdateSarana;
