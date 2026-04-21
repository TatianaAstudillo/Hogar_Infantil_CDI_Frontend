import api from "@/api/axios";

export const getDonantes = async () => {
  const { data } = await api.get("/donante");
  return data;
};

export const getProductos = async () => {
  const { data } = await api.get("/producto");
  return data;
};

export const getNinos = async () => {
  const { data } = await api.get("/menor");
  return data;
};

export const getUsuarios = async () => {
  const { data } = await api.get("/usuario");
  return data;
};