import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useCreateGaleri } from "../../../hooks/useGaleri";
import { ImagePlus, Type, Newspaper } from "lucide-react";

//? I have worked in this code for almost 15 hours, don't ruin it -Gheraldy

const CreateGaleriPage: React.FC = () => {
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
        setFormData({ ...formData, images: e.target.files![0] });
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

  const {
    mutate: createGaleri,
    isSuccess,
    isError,
    error,
    isPending,
  } = useCreateGaleri();

  const [formData, setFormData] = useState({
    title: "",
    images: null as File | null,
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
      setFormData({ ...formData, images: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Ensure both title and image are provided
    if (!formData.title || !formData.images) {
      alert("Title and image are required.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title[]", formData.title);
      if (formData.images) {
        formDataToSend.append("image[]", formData.images);
      }

      // Log the form data for debugging
      for (const pair of formDataToSend.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      // Create gallery using mutation
      createGaleri(formDataToSend);
    } catch (error) {
      console.error("Error creating galeri:", error);
      alert(
        `Error creating galeri: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Newspaper className="w-6 h-6" />
        Create Galeri
      </h1>

      {/* Success message */}
      {isSuccess && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
          Galeri created successfully!
        </div>
      )}

      {/* Error message */}
      {isError && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          Failed to create galeri:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
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

        {/* Image Input */}
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
                <label className="relative cursor-pointer rounded-lg font-medium text-indigo-600 hover:text-indigo-500">
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
        >
          {isPending ? "Loading..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateGaleriPage;
