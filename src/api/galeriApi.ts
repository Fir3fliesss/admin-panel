const BASE_URL = "https://api.smkpluspnb.sch.id/api/api/v1/galeri";

export const getGaleri = async () => {
  const response = await fetch(`${BASE_URL}/show`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
  });
  if (!response.ok) throw new Error("Failed to fetch galeri");
  return response.json();
};

export const createGaleri = async (data: FormData) => {
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
  if (!response.ok) throw new Error("Failed to create galeri");
  return response.json();
};

export const updateGaleri = async ({
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
  if (!response.ok) throw new Error("Failed to update galeri");
  console.log("Res: ", response);
  return response.json();
};

export const deleteGaleri = async (id: string) => {
  const response = await fetch(`${BASE_URL}/delete/${id}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
  });
  if (!response.ok) throw new Error("Failed to delete galeri");
  return response.json();
};
