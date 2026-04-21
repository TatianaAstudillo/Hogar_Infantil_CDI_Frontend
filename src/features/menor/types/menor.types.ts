export type Nino = {
  id_menor: number;
  nombre: string;
  apellido:string;
  fecha_nacimiento: string;
  registro_civil: number;
  genero:string;
  fecha_ingreso: string;
  estado: boolean;
  id_profesora: number;
}

export type Props = {
  
  filters: {
    search: string;
    profesora: string;
    estado: string;
  };
  setFilters: (filters: any) => void;
  profesoras: any[]; 
};