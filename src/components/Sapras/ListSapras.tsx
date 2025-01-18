"use client";
import { useGetSarana, useDeleteSarana } from "@/hooks/useSapras";
import { Pencil, Trash2 } from "lucide-react";

export default function ListSapras() {
  interface Sapras {
    id: string;
    title: string[];
    image: string[];
    sarana_id: string;
  }

  const { data, isPending } = useGetSarana();
  const { mutate: deleteSapras } = useDeleteSarana();

  if (isPending) return <p>Loading...</p>;
  if (!data) return <p>No sarana found</p>;
  console.log("Sapras: ", data.data);

  const handleDelete = (id: string) => {
    console.log("Deleting Sapras with id:", id);
    deleteSapras(id);
  };

  return (
    <div className="mx-auto mb-16">
      {data.data.map((sarana: Sapras) => (
        <div
          key={sarana.id}
          className="flex items-center justify-between rounded-lg bg-transparent p-4 hover:bg-zinc-300/10 transition-colors"
        >
          <div className="flex items-center space-x-4">
            <div className="relative w-20 overflow-hidden rounded">
              <img
                src={"https://api.smkpluspnb.sch.id/storage/" + sarana.image}
                alt={`${sarana.title} cover`}
                className="object-cover h-full w-full"
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-white">{sarana.title}</h3>
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="h-8 w-8 flex justify-center items-center rounded text-zinc-400 hover:text-white hover:bg-zinc-700">
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </div>
            <div
              onClick={() => handleDelete(sarana.sarana_id)}
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
