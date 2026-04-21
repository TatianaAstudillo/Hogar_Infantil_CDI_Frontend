import api from "@/api/axios";

export const getUsuarios = async () => {
  const { data } = await api.get("/usuario");
  return data;
};

export const createUsuario = async (payload: any) => {
  const { data } = await api.post("/usuario", payload);
  return data;
};

export const updateUsuario = async (id: number, payload: any) => {
  const { data } = await api.put(`/usuario/${id}`, payload);
  return data;
};

export const deleteUsuario = async (id: number) => {
  const { data } = await api.delete(`/usuario/${id}`);
  return data;
};