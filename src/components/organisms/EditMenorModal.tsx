import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { updateMenor } from "@/features/menor/services/menor.service";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  menor: any;
  refetch: () => void;
};

export const EditMenorModal = ({
  isOpen,
  onClose,
  menor,
  refetch,
}: Props) => {

  const initialState = {
    nombre: "",
    apellido: "",
    fecha_nacimiento: "",
    registro_civil: "",
    genero: "",
    fecha_ingreso: "",
    estado: "true",
  };

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (menor) {
      setForm({
        nombre: menor.nombre ?? "",
        apellido: menor.apellido ?? "",
        fecha_nacimiento: menor.fecha_nacimiento?.split("T")[0] ?? "",
        registro_civil: menor.registro_civil ?? "",
        genero: menor.genero ?? "",
        fecha_ingreso: menor.fecha_ingreso?.split("T")[0] ?? "",
        estado: menor.estado ? "true" : "false",
      });
    }
  }, [menor]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]:
        name === "registro_civil"
          ? value === "" ? "" : Number(value)
          : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.nombre || !form.apellido) {
      alert("Nombre y apellido son obligatorios");
      return;
    }

    try {
      await updateMenor(menor.id_menor, {
        ...form,
        registro_civil: Number(form.registro_civil),
        estado: form.estado === "true",
      });

      refetch();
      onClose();
    } catch (error) {
      console.error("Error actualizando menor", error);
    }
  };

  if (!isOpen || !menor) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-lg">

        {/* CERRAR */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
        >
          <FiX size={20} />
        </button>

        {/* TITULO */}
        <h2 className="text-lg font-semibold mb-4">
          Editar Niño
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1" >
            <label className="text-sm text-gray-600">Nombre</label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Apellido</label>
            <input
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Fecha de nacimiento</label>
            <input
              type="date"
              name="fecha_nacimiento"
              value={form.fecha_nacimiento}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Registro civil</label>
            <input
              name="registro_civil"
              value={form.registro_civil}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Género</label>
            <select
              name="genero"
              value={form.genero}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg px-3 py-2"
            >
              <option value="">Seleccionar</option>
              <option value="F">Femenino</option>
              <option value="M">Masculino</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Fecha de ingreso</label>
            <input
              type="date"
              name="fecha_ingreso"
              value={form.fecha_ingreso}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Estado</label>
            <select
              name="estado"
              value={form.estado}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg px-3 py-2"
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 rounded-lg"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Guardar cambios
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};