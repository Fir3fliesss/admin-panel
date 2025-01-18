"use client";
import { useGetGaleri, useDeleteGaleri } from "@/hooks/useGaleri";
import { Pencil, Trash2 } from "lucide-react";

export default function ListGaleri() {

  interface Galeri {
    id: string;
    title: string;
    image: string;
    galeri_id: string;
  }

  const { data, isPending } = useGetGaleri();
  const { mutate: deleteGaleri } = useDeleteGaleri();

  if (isPending) return <p>Loading...</p>;
  if (!data || !data.data) return <p>No galeri found</p>;

  const galeriArray: Galeri[] = Object.values(data.data);

  console.log("Galeri nya berisi: ", galeriArray);

  const handleDelete = (id: string) => {
    console.log("Deleting Galeri with id:", id);
    deleteGaleri(id);
  };

  return (
    <div className="mx-auto mb-16">
      {galeriArray.map((galeri: Galeri) => (
        <div
          key={galeri.id}
          className="flex items-center justify-between rounded-lg bg-transparent p-4 hover:bg-zinc-300/10 transition-colors"
        >
          <div className="flex items-center space-x-4">
            <div className="relative w-20 overflow-hidden rounded">
              <img
                src={"https://api.smkpluspnb.sch.id/storage/" + galeri.image}
                alt={`${galeri.title} cover`}
                className="object-cover h-full w-full"
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-white">{galeri.title}</h3>
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="h-8 w-8 flex justify-center items-center rounded text-zinc-400 hover:text-white hover:bg-zinc-700">
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </div>
            <div
              onClick={() => handleDelete(galeri.galeri_id)}
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
