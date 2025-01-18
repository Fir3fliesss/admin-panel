"use client";
import { useGetBerita, useDeleteBerita } from "@/hooks/useBerita";
import { Pencil, Trash2 } from "lucide-react";

export default function ListBerita() {
  interface News {
    id: string;
    berita_id: string;
    author: string;
    title: string;
    subtitle: string;
    description: string;
    tags: string[];
    images: string;
  }

  const { data, isPending } = useGetBerita();
  const { mutate: deleteBerita } = useDeleteBerita();

  if (isPending) return <p>Loading...</p>;
  if (!data) return <p>No news found</p>;
  console.log("News: ", data.data);

  const handleDelete = (id: string) => {
    console.log("Deleting berita with id:", id);
    deleteBerita(id);
  };

  return (
    <div className="mx-auto mb-16">
      {data.data.map((news: News) => (
        <div
          key={news.id}
          className="flex items-center justify-between rounded-lg bg-transparent p-4 hover:bg-zinc-300/10 transition-colors"
        >
          <div className="flex items-center space-x-4">
            <div className="relative w-20 overflow-hidden rounded">
              <img
                src={"https://api.smkpluspnb.sch.id/storage/" + news.images}
                alt={`${news.title} cover`}
                className="object-cover h-full w-full"
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-white">{news.title}</h3>
              <p className="text-sm text-zinc-400">{news.author}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <div

             className="h-8 w-8 flex justify-center items-center rounded text-zinc-400 hover:text-white hover:bg-zinc-700"
             >
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </div>
            <div
              onClick={() => handleDelete(news.berita_id)}
              className="h-8 w-8 flex justify-center items-center rounded text-zinc-400 hover:text-red-400 hover:bg-zinc-700 cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
