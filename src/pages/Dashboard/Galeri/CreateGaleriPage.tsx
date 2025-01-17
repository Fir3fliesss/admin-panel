import { useState, ChangeEvent, FormEvent } from "react";
import { useCreateGaleri } from "../../../hooks/useGaleri";

const CreateGaleriPage = () => {
  const {
    mutate: createGaleri,
    isPending,
    isSuccess,
    isError,
    error,
  } = useCreateGaleri();
  const [formData, setFormData] = useState({
    titles: [""], // Array untuk judul
    images: [null] as (File | null)[], // Array untuk gambar
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    const updatedTitles = [...formData.titles];
    updatedTitles[index] = value;
    setFormData({ ...formData, titles: updatedTitles });
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.target.files && e.target.files[0]) {
      const updatedImages = [...formData.images];
      updatedImages[index] = e.target.files[0];
      setFormData({ ...formData, images: updatedImages });
    }
  };

  const handleAddField = () => {
    setFormData({
      titles: [...formData.titles, ""],
      images: [...formData.images, null],
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validasi input
    if (
      formData.titles.some((title) => !title) ||
      formData.images.some((image) => !image)
    ) {
      alert("Semua field harus diisi!");
      return;
    }

    // Buat FormData untuk mengirim file
    const formDataToSend = new FormData();
    formData.titles.forEach((title) => {
      formDataToSend.append(`title[]`, title); // Kirim sebagai array
    });
    formData.images.forEach((image) => {
      if (image) {
        formDataToSend.append(`image[]`, image); // Kirim sebagai array
      }
    });

    // Panggil API dengan FormData
    createGaleri(formDataToSend);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Galeri</h1>

      {/* Tampilkan pesan sukses */}
      {isSuccess && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
          Galeri created successfully!
        </div>
      )}

      {/* Tampilkan pesan error */}
      {isError && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          Failed to create galeri:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {formData.titles.map((title, index) => (
          <div key={index} className="space-y-2">
            {/* Input untuk Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title {index + 1}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleChange(e, index)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter title"
                aria-label="Title"
              />
            </div>

            {/* Input untuk Images (File Upload) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Image {index + 1}
              </label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, index)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                aria-label="Image"
              />
            </div>
          </div>
        ))}

        {/* Tombol untuk Menambah Field */}
        <button
          type="button"
          onClick={handleAddField}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Add More
        </button>

        {/* Tombol Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
        >
          {isPending ? "Loading..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateGaleriPage;
