import { useState, FormEvent } from "react";
import { useDeleteBerita } from "../../../hooks/useBerita";

const DeleteBeritaPage = () => {
  const { mutate: deleteBerita } = useDeleteBerita();
  const [id, setId] = useState("");

  const handleDelete = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteBerita(id);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Delete Berita</h1>
      <form onSubmit={handleDelete} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Berita ID
          </label>
          <input
            aria-label="id"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Delete
        </button>
      </form>
    </div>
  );
};

export default DeleteBeritaPage;
