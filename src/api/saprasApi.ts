const BASE_URL = "https://api.smkpluspnb.sch.id/api/api/v1/sarana";

export const getSarana = async () => {
  const response = await fetch(`${BASE_URL}/show`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
  });
  if (!response.ok) throw new Error("Failed to fetch berita");
  return response.json();
};

export const createSarana = async (data: FormData) => {
  const response = await fetch(`${BASE_URL}/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    body: data,
    mode: "cors",
  });
  console.log("Res: ", response);
  console.log("Data: ", data);
  if (!response.ok) throw new Error("Failed to create berita");
  return response.json();
};

export const updateSarana = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) => {
  const response = await fetch(`${BASE_URL}/update/${id}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    body: data,
  });
  if (!response.ok) throw new Error("Failed to update berita");
  console.log("Res: ", response);
  return response.json();
};

export const deleteSarana = async (id: string) => {
  const response = await fetch(`${BASE_URL}/delete/${id}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
  });
  if (!response.ok) throw new Error("Failed to delete berita");
  return response.json();
};
