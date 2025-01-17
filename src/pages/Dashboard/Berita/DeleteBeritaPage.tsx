import { useState, FormEvent } from "react";
import { useDeleteBerita } from "../../../hooks/useBerita";

const DeleteBeritaPage = () => {
  const { mutate: deleteBerita } = useDeleteBerita();
  const [id, setId] = useState("");

  const handleDelete = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Deleting berita with id:", id);
    deleteBerita(id);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Delete News</h1>
      <form onSubmit={handleDelete} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 flex">
            Enter News ID to deleted
          </label>
          <input
            aria-label="id"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter News ID, ex: 1"
            className="mt-1 block w-full p-2 bg-transparent border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-transparent border-2 border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors"
        >
          Delete
        </button>
      </form>
    </div>
  );
};

export default DeleteBeritaPage;
