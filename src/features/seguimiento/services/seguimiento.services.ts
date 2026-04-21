import api from "@/api/axios";

export const getSeguimientos = async () => {
  const { data } = await api.get("/seguimiento/profesores/");
  return data;
};

export const createSeguimiento = async (payload: any) => {
  await api.post("/seguimiento", payload);
};

export const updateSeguimiento = async (id: number, payload: any) => {
  await api.put(`/seguimiento/${id}`, payload);
};

export const deleteSeguimiento = async (id: number) => {
  await api.delete(`/seguimiento/${id}`);
};
