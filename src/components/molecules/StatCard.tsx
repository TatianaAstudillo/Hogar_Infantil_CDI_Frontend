import { ReactNode } from "react";
import { FiEdit, FiTrash2, FiEdit2 } from "react-icons/fi";
import { calcularEdad, formatearFecha } from "@/utils/date.utils";

type Props ={
  icon: ReactNode;
  value: string | number;
  label: string;
  color: string;
}

export const StatCard = ({ icon, value, label, color }: Props) => {
  return (
      <div className={`p-4 rounded-xl  flex justify-between items-center ${color}`}>
      
      <div>
        <p className="text-sm opacity-70">{label}</p>
        <h2 className="text-xl font-semibold">{value}</h2>
      </div>

      <div className="bg-white p-3 rounded-full shadow-sm text-lg">
        {icon}
      </div>

    </div>
  );
};

export const MenorCard = ({ menor, onEdit, onDelete }: any) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between h-full">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-xl">
          👶
        </div>

        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${
            menor.estado
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {menor.estado ? "Activo" : "Inactivo"}
        </span>
      </div>

      {/* INFO */}
      <div>
        <h3 className="font-semibold text-lg">
          {menor.nombre} {menor.apellido}
        </h3>

        <p className="text-sm text-gray-500">
          Edad: {calcularEdad(menor.fecha_nacimiento)} años
        </p>

        <p className="text-sm text-gray-500">
          Fecha de ingreso: {formatearFecha(menor.fecha_ingreso)}
        </p>
      </div>

      {/* BOTONES */}
      <div key={menor.id_menor} className="flex justify-end gap-2 mt-4">
  
        <div className="flex gap-2">
      <button onClick={() => onEdit(menor)}  className="p-2 rounded-lg hover:bg-blue-100 text-blue-600">
        <FiEdit />
      </button>

      <button onClick={() => onDelete(menor.id_menor)} className="p-2 rounded-lg hover:bg-red-100 text-red-600">
        <FiTrash2 />
      </button>
    </div>
      </div>
    </div>
  );
};

export const CardSeguimiento = ({ item, setSelected, setIsFormOpen, setIsDeleteOpen }: any) => {

  const getStylesByPriority = (prioridad: string) => {
    switch (prioridad) {
      case "alta":
        return {
          container: "bg-red-50 border-red-200",
          dot: "bg-red-500",
          badge: "bg-red-100 text-red-600",
        };
      case "media":
        return {
          container: "bg-yellow-50 border-yellow-200",
          dot: "bg-yellow-500",
          badge: "bg-yellow-100 text-yellow-600",
        };
      default:
        return {
          container: "bg-green-50 border-green-200",
          dot: "bg-green-500",
          badge: "bg-green-100 text-green-600",
        };
    }
  };
  const getTipoStyles = (tipo: string) => {
  switch (tipo) {
    case "enfermedad":
      return "bg-red-100 text-red-600";
    case "psicologia":
      return "bg-purple-100 text-purple-600";
    case "educacion":
      return "bg-blue-100 text-blue-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

  const styles = getStylesByPriority(item.prioridad);

  return (
    <div
      key={item.id_seguimiento}
      className={`border rounded-xl p-4 ${styles.container}`}
    >
      
      <div className="flex justify-between items-center">

        <div className="flex items-center gap-3">
          
          {/* PUNTO */}
          <div className={`w-4 h-4 rounded-full ${styles.dot}`}></div>

          <h3 className="font-semibold">
            {item.menor_nombre} {item.menor_apellido}
          </h3>

          {/* TIPO */}
         <span
          className={`text-xs px-2 py-1 rounded-full ${getTipoStyles(item.tipo_seguimiento)}`}
        >
          {item.tipo_seguimiento}
        </span>

          {/* PRIORIDAD */}
          <span className={`text-xs px-2 py-1 rounded-full ${styles.badge}`}>
            {item.prioridad}
          </span>

          <span className="text-gray-400 text-sm">
            {new Date(item.fecha_registro).toLocaleDateString()}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              setSelected(item);
              setIsFormOpen(true);
            }}
            className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg flex items-center gap-1"
          >
            <FiEdit2 /> Editar
          </button>

          <button
            onClick={() => {
              setSelected(item);
              setIsDeleteOpen(true);
            }}
            className="bg-red-100 text-red-600 px-3 py-1 rounded-lg"
          >
            <FiTrash2 />
          </button>
        </div>

      </div>

      <p className="mt-2 text-gray-700">
        {item.descripcion}
      </p>

      <div className="mt-2 bg-gray-100 p-3 rounded-lg text-sm text-gray-600">
        <strong>Observaciones:</strong> {item.usuario_nombre} {item.usuario_apellido}
      </div>
    </div>
  );
};