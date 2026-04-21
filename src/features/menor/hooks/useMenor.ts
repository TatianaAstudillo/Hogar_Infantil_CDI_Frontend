import { useMutation, useQuery } from "@tanstack/react-query";
import { getMenor,createMenor,  } from "../services/menor.service";

export const useMenor = () => {
  return useQuery({
    queryKey: ["menor"],
    queryFn: getMenor,
  });
};

export const useCreateMenor = () => {
  return useMutation({
    mutationFn: createMenor,
  });
};

