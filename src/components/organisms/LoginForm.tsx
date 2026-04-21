import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "../../features/auth/schemas/auth.schema";
import { useLogin } from "../../features/auth/hooks/useLogin";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { FormField } from "../molecules/FormField";
import { Button } from "../atoms/Button";
import axios from "axios";
import { useState } from "react";

export const LoginForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { mutate, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    setServerError(null); // limpiar error anterior

  mutate(data, {
    onSuccess: (res) => {
    login( res.token, res.user);
    navigate("/dashboard");
},

 onError: (error) => {
  let message = "Credenciales incorrectas";
 

  if (axios.isAxiosError(error)) {
    message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.response?.data?.msg ||
      "Credenciales incorrectas";
  }

  setServerError(message);
},
  });
};


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField
        label="Correo Electrónico"
        name="correo"
        register={register}
        error={errors.correo?.message}
      />

      <FormField
        label="Contraseña"
        type="password"
        name="password"
        register={register}
        error={errors.password?.message}
      />

      <Button type="submit" disabled={isPending}>
        {isPending ? "Ingresando..." : "Ingresar"}
    </Button>
      {serverError && (
      <p style={{ color: "red" }}>{serverError}</p>
    )}
    </form>
  );
};