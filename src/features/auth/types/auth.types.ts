export type LoginDto = { 
  correo: string,
  password: string,
}
export type AuthResponse = {
  token: string;
  user: {
    id: number;
    nombre: string;
    correo:string;
    rol: string;
  };
}