import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useCreateBerita } from "../../../hooks/useBerita";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import {
  Plus,
  X,
  ImagePlus,
  Tag,
  Type,
  Subtitles,
  FileText,
  Newspaper,
} from "lucide-react";

//? I have work in this code for almost 15 hours don't ruin it -Kurnias

const CreateBeritaPage: React.FC = () => {
  const [parent] = useAutoAnimate();

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

  const handleTagChange = (index: number, value: string) => {
    const newTags = [...formData.tags];
    newTags[index] = value;
    setFormData({ ...formData, tags: newTags });
  };

  const addTag = () => {
    setFormData({ ...formData, tags: [...formData.tags, ""] });
  };

  const removeTag = (index: number) => {
    const newTags = formData.tags.filter((_, i) => i !== index);
    setFormData({ ...formData, tags: newTags });
  };

  const {
    mutate: createBerita,
    isSuccess,
    isError,
    error,
    isPending,
  } = useCreateBerita();
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    images: null as File | null,
    tags: [""],
  });

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

    try {
      const formDataToSend = new FormData();

      formDataToSend.append(
        "author",
        window.localStorage.getItem("authName") || "",
      );
      formDataToSend.append("title", formData.title);
      formDataToSend.append("subtitle", formData.subtitle);
      formDataToSend.append("description", formData.description);

      if (formData.images) {
        formDataToSend.append("images", formData.images);
      }

      formData.tags.forEach((tag) => {
        formDataToSend.append("tags[]", tag);
      });

      for (const pair of formDataToSend.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      createBerita(formDataToSend);
      clearNews();
    } catch (error) {
      console.error("Error creating berita:", error);
      alert(
        `Error creating berita: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  };

  const clearNews = () => {
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      images: null,
      tags: [""],
    });

    const preview = document.getElementById(
      "preview",
    ) as HTMLImageElement | null;
    preview?.src && (preview.src = "");
  };

  const saveToDraft = () => {
    sessionStorage.setItem("draft", JSON.stringify(formData));
    alert("Saved to draft");
  };

  const loadDraft = () => {
    const draftData = sessionStorage.getItem("draft");
    if (draftData) {
      const draft = JSON.parse(draftData);
      setFormData(draft);

      const preview = document.getElementById(
        "preview",
      ) as HTMLImageElement | null;
      if (preview) {
        if (typeof draft.images === "string" && draft.images) {
          preview.src = `https://api.smkpluspnb.sch.id/storage/${draft.images}`;
          preview.classList.remove("hidden");
        } else {
          preview.src = "";
          preview.classList.add("hidden");
        }
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Newspaper className="w-6 h-6" />
        Create News
      </h1>

      {/* Tampilkan pesan sukses */}
      {isSuccess && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
          News created successfully!
        </div>
      )}

      {/* Tampilkan pesan error */}
      {isError && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          Failed to create news:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </div>
      )}

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

        {/* Input untuk Subtitle */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Subtitles className="w-4 h-4 mr-2" />
            Subtitle
          </label>
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={(e) => handleChange(e, "subtitle")}
            className="mt-1 block w-full bg-transparent p-2 border border-gray-300 rounded-lg"
            placeholder="Enter subtitle"
            aria-label="Subtitle"
          />
        </div>

        {/* Input untuk Description */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700">
            <FileText className="w-4 h-4 mr-2" />
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) => handleChange(e, "description")}
            className="mt-1 block w-full p-2 bg-transparent border border-gray-300 rounded-lg"
            placeholder="Enter description"
            aria-label="Description"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Tag className="w-4 h-4 mr-2" />
            Tags
          </label>
          <div className="space-y-2" ref={parent}>
            {formData.tags.map((tag, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => handleTagChange(index, e.target.value)}
                  className="flex-1 px-4 py-2 bg-transparent border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={`Enter tag ${index + 1}`}
                />
                {formData.tags.length > 1 && (
                  <button
                    title="Remove tag"
                    type="button"
                    onClick={() => removeTag(index)}
                    className="p-2 text-red-600 bg-transparent border-2 rounded-lg hover:text-red-800"
                  >
                    <X className="w-5 h-5 " />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addTag}
              className="inline-flex items-center bg-transparent px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Tag
            </button>
          </div>
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
              src=""
              className="mt-4 mx-auto max-h-full hidden"
              id="preview"
              alt="Preview"
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
      <button
        onClick={saveToDraft}
        className=" mt-2 mr-1 px-4 py-2 border border-blue-500  rounded-lg  hover:bg-blue-500 hover:text-white transition-colors "
      >
        Save to Draft
      </button>
      <button
        onClick={loadDraft}
        className=" mt-2 ml-1 px-4 py-2 border border-blue-500  rounded-lg  hover:bg-blue-500 hover:text-white transition-colors "
      >
        Load Draft
      </button>
    </div>
  );
};

export default CreateBeritaPage;
