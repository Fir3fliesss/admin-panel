import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useGetGaleri, useUpdateGaleri } from "../../../hooks/useGaleri";
import { useParams } from "react-router-dom";
import ListGaleri from "../../../components/Galeri/ListGaleri";
import {
  ImagePlus,
  Type,
  Newspaper,
} from "lucide-react";
import { updateGaleri } from "@/api/galeriApi";

const BASE_URL = "https://api.smkpluspnb.sch.id/api/api/v1/galeri/show";

interface Galeri {
  title: string[];
  images: string; // URL gambar
  galeri_id: string;
}

const UpdateGaleriPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: galeriList } = useGetGaleri();
  const {
    mutate: updateGaleri,
    isSuccess,
    isError,
    isPending,
  } = useUpdateGaleri();

  const [formData, setFormData] = useState({
    title: "",
    images: null as File | null,
  });

  useEffect(() => {
    const dropzone = document.getElementById("dropzone");
    const input = document.getElementById("file-upload") as HTMLInputElement;

    if (!dropzone || !input) return;

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      dropzone.classList.add("border-indigo-600");
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      dropzone.classList.remove("border-indigo-600");
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      dropzone.classList.remove("border-indigo-600");
      const file = e.dataTransfer?.files[0];
      if (file) {
        displayPreview(file);
      }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        displayPreview(e.target.files![0]);
      }
    };

    function displayPreview(file: File) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const preview = document.getElementById(
          "preview",
        ) as HTMLImageElement | null;
        if (preview && reader.result) {
          preview.src = reader.result as string;
          preview.classList.remove("hidden");
        }
      };
    }

    dropzone.addEventListener("dragover", handleDragOver);
    dropzone.addEventListener("dragleave", handleDragLeave);
    dropzone.addEventListener("drop", handleDrop);
    input.addEventListener(
      "change",
      handleFileChange as unknown as EventListener,
    );

    return () => {
      dropzone.removeEventListener("dragover", handleDragOver);
      dropzone.removeEventListener("dragleave", handleDragLeave);
      dropzone.removeEventListener("drop", handleDrop);
      input.removeEventListener(
        "change",
        handleFileChange as unknown as EventListener,
      );
    };
  }, []);

  // useEffect(() => {
  //   if (beritaList) {
  //     const selectedBerita = beritaList.data.find((b: Berita) => b.id === id);
  //     if (selectedBerita) {
  //       setFormData({
  //         title: selectedBerita.title,
  //         subtitle: selectedBerita.subtitle,
  //         description: selectedBerita.description,
  //         tags: selectedBerita.tags,
  //         images: null, // Tetap null karena kita akan mengunggah file baru
  //       });
  //     }
  //   }
  // }, [beritaList, id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof typeof formData,
  ) => {
    const { value } = e.target;
    setFormData({ ...formData, [field]: value });
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
    if (formData.images) {
      formDataToSend.append("images", formData.images); // Tambahkan file gambar
    }

    if (id) {
      updateGaleri({ id, data: formDataToSend });
    }
  };

  return (
    <div className="p-4">
      <ListGaleri />
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Newspaper className="w-6 h-6" />
        Update Galeri
      </h1>
      {isSuccess && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
          Berita updated successfully!
        </div>
      )}
      {isError && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          Failed to update galeri.
        </div>
      )}

      {/* <section>
        <h2 className="text-lg font-semibold mb-2">Current Berita</h2>
        {beritaList.data.map((berita: Berita) => (
          <div key={berita.id} className="p-4 border border-gray-200 mb-4">
            <h3 className="text-lg font-semibold">{berita.title}</h3>
            <p className="text-sm text-gray-500">{berita.subtitle}</p>
            <p className="text-sm text-gray-500">{berita.description}</p>
            <p className="text-sm text-gray-500">{berita.tags.join(", ")}</p>
            <img
              src={berita.images}
              alt={berita.title}
              className="w-32 h-32 object-cover mt-2"
            />
          </div>
        ))}
      </section> */}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input untuk Title */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Type className="w-4 h-4 mr-2" />
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange(e, "title")}
            className="w-full px-4 py-2 border bg-transparent border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter title"
          />
        </div>

        {/* Input untuk Images (File Upload) */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <ImagePlus className="w-4 h-4 mr-2" />
            Image
          </label>
          <div
            id="dropzone"
            className="mt-1 flex flex-col items-center justify-center px-6 pt-5 border-2 border-dashed pb-6 rounded-lg transition-colors"
          >
            <div className="space-y-1 text-center">
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer rounded-lg font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    id="file-upload"
                    name="images"
                    className="sr-only"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to XXMB</p>
            </div>

            <img
              title="Preview"
              src=""
              className="mt-4 mx-auto max-h-full hidden"
              id="preview"
            ></img>
          </div>
        </div>

        {/* Tombol Submit */}
        <button
          type="submit"
          disabled={isPending} // Ganti isLoading dengan isPending
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
        >
          {isPending ? "Loading..." : "Create"}{" "}
          {/* Ganti isLoading dengan isPending */}
        </button>
      </form>
    </div>
  );
};

export default UpdateGaleriPage;
