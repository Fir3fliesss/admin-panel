import { useState, ChangeEvent, FormEvent } from "react";
import { useCreateSarana } from "../../../hooks/useSapras";

const CreateSaprasPage = () => {
  const { mutate: createSarana, isSuccess, isError } = useCreateSarana();
  const [formData, setFormData] = useState({
    images: [""], // Array untuk gambar
    titles: [""], // Array untuk judul
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof typeof formData,
  ) => {
    const { value } = e.target;
    const updatedField = [...formData[field]];
    updatedField[index] = value;
    setFormData({ ...formData, [field]: updatedField });
  };

  const handleAddField = (field: keyof typeof formData) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createSarana(formData);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Sapras</h1>
      {isSuccess && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
          Sapras created successfully!
        </div>
      )}
      {isError && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          Failed to create sapras.
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input untuk Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Images
          </label>
          {formData.images.map((image, index) => (
            <div key={index} className="mt-2">
              <input
                type="text"
                value={image}
                onChange={(e) => handleChange(e, index, "images")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder={`Image URL ${index + 1}`}
                aria-label={`Image URL ${index + 1}`}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddField("images")}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Add Image URL
          </button>
        </div>

        {/* Input untuk Titles */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Titles
          </label>
          {formData.titles.map((title, index) => (
            <div key={index} className="mt-2">
              <input
                type="text"
                value={title}
                onChange={(e) => handleChange(e, index, "titles")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder={`Title ${index + 1}`}
                aria-label={`Title ${index + 1}`}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddField("titles")}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Add Title
          </button>
        </div>

        {/* Tombol Submit */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateSaprasPage;
