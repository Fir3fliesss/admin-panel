import { fetchWithAuth } from "./utils";

const BASE_URL = "https://api.smkpluspnb.sch.id/api/api";

/**
 * Mendapatkan semua data galeri.
 */
export const getGaleri = async () => {
  const response = await fetchWithAuth(`${BASE_URL}/v1/galeri/show`);
  return response.data;
};

/**
 * Membuat galeri baru.
 */
export const createGaleri = async (data: FormData) => {
  const response = await fetchWithAuth(`${BASE_URL}/api/v1/galeri/create`, {
    method: "POST",
    body: data,
  });
  return response.data;
};

/**
 * Memperbarui galeri.
 */
export const updateGaleri = async (id: string, data: FormData) => {
  const response = await fetchWithAuth(
    `${BASE_URL}/api/v1/galeri/update/${id}`,
    {
      method: "POST",
      body: data,
    },
  );
  return response.data;
};

/**
 * Menghapus galeri.
 */
export const deleteGaleri = async (id: string) => {
  const response = await fetchWithAuth(
    `${BASE_URL}/api/v1/galeri/delete/${id}`,
    {
      method: "POST",
    },
  );
  return response.data;
};
