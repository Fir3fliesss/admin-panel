import React, { useState } from "react";
import { useUpdateGaleri } from "../../hooks/useGaleri";

interface UpdateGaleriProps {
  id: string;
  initialData: {
    images: string[];
    titles: string[];
  };
}

const UpdateGaleri: React.FC<UpdateGaleriProps> = ({ id, initialData }) => {
  const [images, setImages] = useState<File[]>([]);
  const [titles, setTitles] = useState(initialData.titles);
  const { mutate, isPending } = useUpdateGaleri();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(files);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    titles.forEach((title, index) => {
      formData.append(`title[${index}]`, title);
    });
    images.forEach((image, index) => {
      formData.append(`image[${index}]`, image);
    });

    mutate({ id, data: formData });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={titles.join(",")}
        onChange={(e) => setTitles(e.target.value.split(","))}
        placeholder="Titles (comma separated)"
        required
      />
      <input
        type="file"
        multiple
        onChange={handleImageChange}
        placeholder="Images"
        required
      />
      <button type="submit" disabled={isPending}>
        {isPending ? "Updating..." : "Update"}
      </button>
    </form>
  );
};

export default UpdateGaleri;
