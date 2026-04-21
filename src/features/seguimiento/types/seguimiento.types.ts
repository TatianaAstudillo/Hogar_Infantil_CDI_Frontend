export type Seguimiento = {
  id_seguimiento: number;
  descripcion: string;
  tipo: "enfermedad" | "educacion" | "psicologia";
  fecha_registro: string;
  id_usuario: number;
  id_menor: number;
  prioridad: "alta" | "media" | "baja";
};