import React, { useState } from "react";
import {
  useGetGaleri,
  useCreateGaleri,
  useUpdateGaleri,
  useDeleteGaleri,
} from "../../../hooks/useGaleri";
import { Galeri } from "../../../types/galeri";

const GaleriPage = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const { data: galeri, isLoading, isError } = useGetGaleri();
  const createMutation = useCreateGaleri();
  const updateMutation = useUpdateGaleri();
  const deleteMutation = useDeleteGaleri();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title[]", title);
    if (image) {
      formData.append("image[]", image);
    }
    createMutation.mutate(formData);
  };

  const handleUpdate = (id: string) => {
    const formData = new FormData();
    formData.append("title", editTitle);
    if (image) {
      formData.append("image", image);
    }
    updateMutation.mutate({ id, data: formData });
    setEditingId(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div>
      <h1>Galeri</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          aria-label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="file"
          aria-label="Image"
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
        />
        <button type="submit">Create Galeri</button>
      </form>

      <ul>
        {galeri?.map((item: Galeri) => (
          <li key={item.id}>
            {editingId === item.id ? (
              <div>
                <input
                  type="text"
                  value={editTitle}
                  aria-label="Edit Title"
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                  type="file"
                  aria-label="Edit Image"
                  onChange={(e) =>
                    setImage(e.target.files ? e.target.files[0] : null)
                  }
                />
                <button onClick={() => handleUpdate(item.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                {item.title}
                <button onClick={() => deleteMutation.mutate(item.id)}>
                  Delete
                </button>
                <button
                  onClick={() => {
                    setEditingId(item.id);
                    setEditTitle(item.title);
                  }}
                >
                  Edit
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GaleriPage;
