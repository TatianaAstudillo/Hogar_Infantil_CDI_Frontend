import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../services/auth.services.ts";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginRequest,
  });
};