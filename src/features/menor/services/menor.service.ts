import api from "@/api/axios";

export const getMenor = async () => {
  const { data } = await api.get("/menor");
  return data;
};

export const createMenor = async (menor: any) => {
  const { data } = await api.post("/menor", menor);
  return data;
};

export const deleteMenor = async (id: number) => {
  const { data } = await api.delete(`/menor/${id}`);
  return data;
};

export const updateMenor = async (id: number, payload: any) => {
  const { data } = await api.put(`/menor/${id}`, payload);
  return data;
};