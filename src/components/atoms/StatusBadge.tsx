export const StatusBadge = ({ estado }: { estado: boolean }) => {
  return (
    <span
      className={`text-xs px-2 py-1 rounded-full ${
        estado
          ? "bg-green-100 text-green-600"
          : "bg-red-100 text-red-500"
      }`}
    >
      {estado ? "Activo" : "Inactivo"}
    </span>
  );
};