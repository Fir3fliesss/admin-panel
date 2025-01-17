const BASE_URL = "https://api.smkpluspnb.sch.id/api/api/v1/sarana";

export const getSarana = async () => {
  const response = await fetch(`${BASE_URL}/show`);
  if (!response.ok) throw new Error("Failed to fetch sarana");
  return response.json();
};

export const createSarana = async (data: {
  images: string[];
  titles: string[];
}) => {
  const response = await fetch(`${BASE_URL}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create sarana");
  return response.json();
};

export const updateSarana = async ({
  id,
  data,
}: {
  id: string;
  data: { images: string[]; titles: string[] };
}) => {
  const response = await fetch(`${BASE_URL}/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update sarana");
  return response.json();
};

export const deleteSarana = async (id: string) => {
  const response = await fetch(`${BASE_URL}/delete/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete sarana");
  return response.json();
};
