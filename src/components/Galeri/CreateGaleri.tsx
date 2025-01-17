import React, { useState } from "react";
import { useCreateGaleri } from "../../hooks/useGaleri";

const CreateGaleri = () => {
  const [images, setImages] = useState<File[]>([]);
  const [titles, setTitles] = useState<string[]>([]);
  const { mutate, isPending } = useCreateGaleri();

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

    mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Images
        </label>
        <input
          aria-label="images"
          type="file"
          multiple
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Titles (comma separated)
        </label>
        <input
          type="text"
          value={titles.join(",")}
          onChange={(e) => setTitles(e.target.value.split(","))}
          placeholder="Enter titles"
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {isPending ? "Creating..." : "Create"}
      </button>
    </form>
  );
};

export default CreateGaleri;
