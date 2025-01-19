import React, { useState } from "react";
import { useCreateSarana } from "../../hooks/useSapras";

const CreateSarana = () => {
  const [image, setImages] = useState<string[]>([]);
  const [titles, setTitles] = useState<string[]>([]);
  const { mutate, isPending } = useCreateSarana();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ image, titles });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={image.join(",")}
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
        {isPending ? "Creating..." : "Create"}
      </button>
    </form>
  );
};

export default CreateSarana;
