import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import {CardSeguimiento  } from "../molecules/StatCard";
import { FiActivity, FiSmile, FiBookOpen } from "react-icons/fi";

import {
  getSeguimientos,
  createSeguimiento,
  updateSeguimiento,
  deleteSeguimiento,
} from "../../features/seguimiento/services/seguimiento.services";

import { FormModal, Field } from "@/components/modals/FormModal";
import { ConfirmModal } from "@/components/modals/ConfirModal";
import api from "@/api/axios";

export const SeguimientoPage = () => {

  const [data, setData] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [menores, setMenores] = useState<any[]>([]); // 🔥 NUEVO

  const [search, setSearch] = useState("");
  const [tipo, setTipo] = useState("Todas");
  const [prioridad, setPrioridad] = useState("Todas");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selected, setSelected] = useState<any>(null);
  const [usuarios, setUsuarios] = useState<any[]>([]);

  
  const loadData = async () => {
    try {
      const [seguimientosRes, menoresRes] = await Promise.all([
        getSeguimientos(),
        api.get("/menor"),
      ]);

      setData(seguimientosRes);
      setFiltered(seguimientosRes);
      setMenores(menoresRes.data); 

    } catch (error) {
      console.error("Error cargando seguimientos", error);
    }
  };
  const loadUsuarios = async () => {
  try {
    const res = await api.get("/usuario");
    setUsuarios(res.data);
  } catch (error) {
    console.error("Error cargando usuarios", error);
  }
};

useEffect(() => {
  loadUsuarios();
}, []);
  

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    let temp = [...data];

    if (search) {
      temp = temp.filter((s) =>
        s.descripcion?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (tipo !== "Todas") {
      temp = temp.filter((s) => s.tipo_seguimiento === tipo);
    }

    if (prioridad !== "Todas") {
      temp = temp.filter((s) => s.prioridad === prioridad);
    }

    setFiltered(temp);
  }, [search, tipo, prioridad, data]);

  const handleSubmit = async (form: any) => {
    try {
     const payload = {
        id_menor: Number(form.id_menor),
        id_usuario: Number(form.id_usuario),
        tipo_seguimiento: form.tipo_seguimiento,
        descripcion: form.descripcion,
        fecha_registro: form.fecha_registro || null,
        prioridad: form.prioridad,
      };
      console.log("FORM:", form);
      console.log("PAYLOAD:", payload);

      if (selected) {
        await updateSeguimiento(selected.id_seguimiento, payload);
      } else {
        await createSeguimiento(payload);
      }

      loadData();
    } catch (error) {
      console.error("Error guardando seguimiento", error);
    }
  };


  const handleDelete = async () => {
    try {
      await deleteSeguimiento(selected.id_seguimiento);
      setIsDeleteOpen(false);
      loadData();
    } catch (error) {
      console.error("Error eliminando seguimiento", error);
    }
  };


  const fields: Field[] = [
    {
      name: "id_menor",
      label: "Niño",
      type: "select",
      options: menores.map((m: any) => ({
        label: `${m.nombre} ${m.apellido}`,
        value: m.id_menor,
      })),
    },

    {
      name: "tipo_seguimiento",
      label: "Categoría",
      type: "select",
      options: [
        { label: "Enfermedad", value: "enfermedad" },
        { label: "Psicología", value: "psicologia" },
        { label: "Educación", value: "educacion" },
      ],
    },

    { name: "descripcion", label: "Descripción", type: "text" },
    {
      name: "id_usuario",
      label: "Usuario",
      type: "select",
      options: usuarios.map((u: any) => ({
        label: `${u.nombre} ${u.apellido}`,
        value: u.id_usuario,
      })),
    },
    {
      name: "fecha_registro",
      label: "Fecha",
      type: "date",
    },

    {
      name: "prioridad",
      label: "Prioridad",
      type: "select",
      options: [
        { label: "Alta", value: "alta" },
        { label: "Media", value: "media" },
        { label: "Baja", value: "baja" },
      ],
    },
  ];
  const grouped = {
    enfermedad: filtered.filter((s) => s.tipo_seguimiento === "enfermedad"),
    psicologia: filtered.filter((s) => s.tipo_seguimiento === "psicologia"),
    educacion: filtered.filter((s) => s.tipo_seguimiento === "educacion"),
  };

  return (
    <div className="p-6 flex flex-col gap-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">
            Seguimiento Menor
          </h1>
          <p className="text-gray-500 text-sm">
            Registra novedades en salud, educación y psicología
          </p>
        </div>

        <button
          onClick={() => {
            setSelected(null);
            setIsFormOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FiPlus />
          Agregar Seguimiento
        </button>
      </div>

      {/* FILTROS */}
      <div className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row gap-4">

        <div className="flex flex-col gap-1 w-full">
          <label className="text-xs text-gray-500">Nombre o descripción</label>
          <input
            placeholder="Buscar seguimiento..."
            className="border border-gray-200 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

       <div className="flex flex-col gap-1 w-full md:w-52">
        <label className="text-xs text-gray-500">Categoría</label>
        <select
          className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option value="Todas">Todas</option>
          <option value="enfermedad">Enfermedad</option>
          <option value="psicologia">Psicología</option>
          <option value="educacion">Educación</option>
        </select>
      </div>

       <div className="flex flex-col gap-1 w-full md:w-52">
        <label className="text-xs text-gray-500">Prioridad</label>
        <select
          className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={prioridad}
          onChange={(e) => setPrioridad(e.target.value)}
        >
          <option value="Todas">Todas</option>
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
      </div>

      </div>

      {/* LISTA */}
      <div className="flex flex-col gap-6">

  {/* 🩺 ENFERMEDAD */}
  <div>
    <div className="flex items-center gap-2 mb-4">
    <div className="bg-red-100 text-red-600 p-2 rounded-lg">
      <FiActivity size={18} />
    </div>
    <h2 className="font-semibold text-red-700">
      Seguimiento de Enfermedad
    </h2>
  </div>

    <div className="flex flex-col gap-4">
      {grouped.enfermedad.map((item) => (
        <CardSeguimiento item={item} setSelected={setSelected} setIsFormOpen={setIsFormOpen} setIsDeleteOpen={setIsDeleteOpen} />
      ))}
    </div>
  </div>

  {/* 🧠 PSICOLOGÍA */}
  <div>
   <div className="flex items-center gap-2 mb-4">
    <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
      <FiSmile size={18} />
    </div>
    <h2 className="font-semibold text-purple-700">
      Seguimiento Psicológico
    </h2>
  </div>

    <div className="flex flex-col gap-4">
      {grouped.psicologia.map((item) => (
        <CardSeguimiento item={item} setSelected={setSelected} setIsFormOpen={setIsFormOpen} setIsDeleteOpen={setIsDeleteOpen} />
      ))}
    </div>
  </div>

  {/* 📚 EDUCACIÓN */}
  <div>
    <div className="flex items-center gap-2 mb-4">
    <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
      <FiBookOpen size={18} />
    </div>
    <h2 className="font-semibold text-blue-700">
      Seguimiento Educativo
    </h2>
  </div>

    <div className="flex flex-col gap-4">
      {grouped.educacion.map((item) => (
        <CardSeguimiento item={item} setSelected={setSelected} setIsFormOpen={setIsFormOpen} setIsDeleteOpen={setIsDeleteOpen} />
      ))}
    </div>
  </div>

</div>


      {/* MODALES */}
      <FormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={selected ? "Editar Seguimiento" : "Nuevo Seguimiento"}
        fields={fields}
        initialData={selected}
        onSubmit={handleSubmit}
      />

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        message="¿Eliminar este seguimiento?"
      />

    </div>
  );
};