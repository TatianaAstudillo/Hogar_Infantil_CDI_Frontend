import api from "../../../api/axios.ts";
import { LoginDto, AuthResponse } from "../types/auth.types.ts";

export const loginRequest = async (data: LoginDto): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", data);
  return response.data;
};
