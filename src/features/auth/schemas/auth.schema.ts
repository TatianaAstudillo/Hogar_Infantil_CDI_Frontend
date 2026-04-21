import { z } from "zod";

export const loginSchema = z.object({
  correo: z
    .string()
    .email("Correo inválido")
    .min(1, "El correo es obligatorio"),

  password: z
    .string()
    .min(6, "Mínimo 6 caracteres")
    .min(1, "La contraseña es obligatoria"),
});

//  Esto asegura que el schema y  type estén alineados
export type LoginSchema = z.infer<typeof loginSchema>;

