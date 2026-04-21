import { useQuery } from "@tanstack/react-query";
import { getUsuarios } from "../services/usuario.services";

export const useUsuario = () => {
  return useQuery({
    queryKey: ["usuario"],
    queryFn: getUsuarios,
  });
};