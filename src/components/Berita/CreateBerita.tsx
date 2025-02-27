import { useState, ChangeEvent, FormEvent } from "react";
import { useCreateBerita } from "../../hooks/useBerita";

const CreateBeritaPage = () => {
  const { mutate: createBerita, isSuccess, isError } = useCreateBerita();
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    tags: [""], // Tags berbentuk array
    images: null as File | null, // File gambar
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof typeof formData,
  ) => {
    const { value } = e.target;
    setFormData({ ...formData, [field]: value });
  };

  const handleTagsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(",");
    setFormData({ ...formData, tags });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, images: e.target.files[0] }); // Simpan file yang dipilih
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Buat FormData untuk mengirim file
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("subtitle", formData.subtitle);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("tags", formData.tags.join(","));
    if (formData.images) {
      formDataToSend.append("images", formData.images); // Tambahkan file gambar
    }

    // Panggil mutate dengan FormData
    createBerita(formDataToSend);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Berita</h1>
      {isSuccess && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
          Berita created successfully!
        </div>
      )}
      {isError && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          Failed to create berita.
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input untuk Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) => handleChange(e, "title")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter title"
            aria-label="Title"
          />
        </div>

        {/* Input untuk Subtitle */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Subtitle
          </label>
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={(e) => handleChange(e, "subtitle")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter subtitle"
            aria-label="Subtitle"
          />
        </div>

        {/* Input untuk Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) => handleChange(e, "description")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter description"
            aria-label="Description"
          />
        </div>

        {/* Input untuk Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tags (comma separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags.join(",")} // Gabungkan tags dengan koma
            onChange={handleTagsChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter tags (e.g., tag1,tag2,tag3)"
            aria-label="Tags"
          />
        </div>

        {/* Input untuk Images (File Upload) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="file"
            name="images"
            onChange={handleFileChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            aria-label="Image"
          />
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

export default CreateBeritaPage;
