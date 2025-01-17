import { useState, FormEvent } from "react";
import { useDeleteGaleri } from "../../../hooks/useGaleri";

const DeleteGaleriPage = () => {
  const { mutate: deleteGaleri, isSuccess, isError } = useDeleteGaleri();
  const [id, setId] = useState("");

  const handleDelete = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteGaleri(id);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Delete Galeri</h1>
      {isSuccess && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
          Galeri deleted successfully!
        </div>
      )}
      {isError && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          Failed to delete galeri.
        </div>
      )}
      <form onSubmit={handleDelete} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Galeri ID
          </label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter Galeri ID"
            aria-label="Galeri ID"
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

export default DeleteGaleriPage;
