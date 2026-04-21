import { FiX } from "react-icons/fi";
import { useState } from "react";
import { createMenor } from "@/features/menor/services/menor.service";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  profesoras: any[];
  refetch: () => void;
};

export const CreateMenorModal = ({
  isOpen,
  onClose,
  profesoras = [],
  refetch,
}: Props) => {

  const initialState = {
    nombre: "",
    apellido: "",
    fecha_nacimiento: "",
    registro_civil: "",
    genero: "",
    id_profesora: "",
    estado: "true",
    fecha_ingreso: "",
  };

  const [form, setForm] = useState(initialState);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !form.nombre ||
      !form.apellido ||
      !form.fecha_nacimiento ||
      !form.registro_civil ||
      !form.genero ||
      !form.id_profesora ||
      !form.fecha_ingreso
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const payload = {
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      fecha_nacimiento: form.fecha_nacimiento,
      registro_civil: Number(form.registro_civil),
      genero: form.genero,
      fecha_ingreso: form.fecha_ingreso,
      estado: form.estado === "true",

      id_profesora: Number(form.id_profesora)
    };

      await createMenor(payload);

      refetch();
      setForm(initialState);
      onClose();

    } catch (error) {
      console.error("Error creando menor", error);
      alert("Error al crear el niño, revisa los datos");
    }
  };

  if (!isOpen) return null;

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

        <h2 className="text-lg font-semibold mb-4">
          Agregar Niño
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Nombre</label>
            <input
              name="nombre"
              value={form.nombre}
              className="border border-gray-200 rounded-lg px-3 py-2"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Apellido</label>
            <input
              name="apellido"
              value={form.apellido}
              className="border border-gray-200 rounded-lg px-3 py-2"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Fecha de nacimiento</label>
            <input
              type="date"
              name="fecha_nacimiento"
              value={form.fecha_nacimiento}
              className="border border-gray-200 rounded-lg px-3 py-2"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Registro civil</label>
            <input
              name="registro_civil"
              value={form.registro_civil}
              className="border border-gray-200 rounded-lg px-3 py-2"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Género</label>
            <select
              name="genero"
              value={form.genero}
              className="border border-gray-200 rounded-lg px-3 py-2"
              onChange={handleChange}
            >
              <option value="">Seleccionar género</option>
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
            </select>
          </div>

          {/* ✅ SELECT CORRECTO */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Profesora a cargo</label>
            <select
              name="id_profesora"
              value={form.id_profesora}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg px-3 py-2"
            >
              <option value="">Seleccionar profesora</option>

              {profesoras.map((p: any) => (
                <option key={p.id_profesora} value={p.id_profesora}>
                  {p.nombre}
                </option>
              ))}
            </select>
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
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Agregar Niño
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};