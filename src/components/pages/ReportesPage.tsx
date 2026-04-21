import { FiGift, FiBox, FiUsers, FiUser } from "react-icons/fi";
import {
  getDonantes,
  getProductos,
  getNinos,
  getUsuarios,
} from "../../features/reportes/services/reportes.service";
import { generatePDF } from "../../utils/generatePdf";

export const ReportesPage = () => {

  const handleDonantes = async () => {
    const data = await getDonantes();

    generatePDF(
      "Reporte de Donantes",
      "Listado completo de donantes registrados en el CDI-Santa Monica",
      ["Nombre", "Teléfono", "Correo", "Dirección"],
      data.map((d: any) => [
        d.nombre,
        d.telefono,
        d.correo,
        d.direccion,
      ])
    );
  };


  const handleInventario = async () => {
    const data = await getProductos();

    generatePDF(
      "Reporte de Inventario",
      "Listado completo de productos con su donante",
      ["Producto", "Categoría", "Stock", "Estado"],
      data.map((p: any) => [
        p.nombre,
        p.categoria,
        p.stock,
        p.estado ? "Activo" : "Inactivo",
      ])
    );
  };


  const handleNinos = async () => {
    const data = await getNinos();

    generatePDF(
      "Reporte de Niños",
      "Listado completo de niños registrados en el CDI-Santa Monica",
      [
        "Nombre",
        "Apellido",
        "Fecha Nacimiento",
        "Registro Civil",
        "Género",
        "Estado",
      ],
      data.map((n: any) => [
        n.nombre,
        n.apellido,
        new Date(n.fecha_nacimiento).toLocaleDateString(),
        n.registro_civil,
        n.genero,
        n.estado ? "Activo" : "Inactivo",
      ])
    );
  };


  const handleUsuarios = async () => {
    const data = await getUsuarios();

    generatePDF(
      "Reporte de Personal",
      "Listado completo del personal del CDI-Santa Monica",
      [
        "Nombre",
        "Apellido",
        "Correo",
        "Rol",
        "Estado",
        "Fecha Creación",
      ],
      data.map((u: any) => [
        u.nombre,
        u.apellido,
        u.correo,
        u.rol,
        u.estado ? "Activo" : "Inactivo",
        new Date(u.fecha_creacion).toLocaleDateString(),
      ])
    );
  };



  return (
    <div className="p-6 flex flex-col gap-6">

      <div>
        <h1 className="text-2xl font-semibold">Reportes</h1>
        <p className="text-gray-500 text-sm">
          Genera reportes del sistema en PDF
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* DONACIONES */}
        <div
          onClick={handleDonantes} 
          className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-blue-400 transition"
        >
          <FiGift className="text-3xl text-yellow-500" />
          <p>Reporte de Donantes</p>
        </div>

        {/* INVENTARIO */}
        <div
          onClick={handleInventario}
          className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-green-400 transition"
        >
          <FiBox className="text-3xl text-green-600" />
          <p>Reporte de Inventario</p>
        </div>

        {/* NIÑOS */}
        <div
          onClick={handleNinos}
          className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-blue-400 transition"
        >
          <FiUsers className="text-3xl text-blue-500" />
          <p>Reporte de Niños</p>
        </div>

        {/* PERSONAL */}
        <div
          onClick={handleUsuarios}
          className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-purple-400 transition"
        >
          <FiUser className="text-3xl text-purple-500" />
          <p>Reporte de Personal</p>
        </div>

      </div>
    </div>
  );
};