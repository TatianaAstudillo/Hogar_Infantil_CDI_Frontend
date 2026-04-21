import { useEffect, useState } from "react";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { DataTable } from "@/components/organisms/DataTable";
import { FormModal, Field } from "@/components/modals/FormModal";
import { ConfirmModal } from "@/components/modals/ConfirModal";
import api from "@/api/axios";

export const DonacionesPage = () => {


  const [donaciones, setDonaciones] = useState([]);
  const [, setLoadingDonaciones] = useState(true);


  const [donantes, setDonantes] = useState([]);
  const [, setLoadingDonantes] = useState(true);

  const [selected, setSelected] = useState<any>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [, setMode] = useState<"donacion" | "donante">("donante");

  
  const loadDonaciones = async () => {
    try {
      const { data } = await api.get("/donacion");
      setDonaciones(data);
    } catch (error) {
      console.error("Error donaciones", error);
    } finally {
      setLoadingDonaciones(false);
    }
  };

  const loadDonantes = async () => {
    try {
      const { data } = await api.get("/donante");
      setDonantes(data);
    } catch (error) {
      console.error("Error donantes", error);
    } finally {
      setLoadingDonantes(false);
    }
  };

  useEffect(() => {
    loadDonaciones();
    loadDonantes();
  }, []);

 
 const handleSubmitDonante = async (form: any) => {
  try {
    const payload = {
      nombre: form.nombre,
      telefono: form.telefono,
      correo: form.correo,
      direccion: form.direccion,
    };

    if (selected) {
      await api.put(`/donante/${selected.id_donante}`, payload);
    } else {
      await api.post("/donante", payload);
    }

    loadDonantes();
  } catch (error) {
    console.error("Error guardando donante", error);
  }
};

  const handleDeleteDonante = async () => {
    try {
      await api.delete(`/donante/${selected.id_donante}`);
      setIsDeleteOpen(false);
      loadDonantes();
    } catch (error) {
      console.error("Error eliminando donante", error);
    }
  };


  const donacionesColumns = [
    {
      header: "Fecha",
      accessor: "fecha_donacion",
      render: (row: any) =>
        new Date(row.fecha_donacion).toLocaleDateString(),
    },
    { header: "Donador", accessor: "donante" },
    { header: "Producto", accessor: "producto" },
    { header: "Categoría", accessor: "categoria" },
    { header: "Cantidad", accessor: "stock" },
  ];

 
  const donantesColumns = [
    {
      header: "Nombre",
      accessor: "nombre",
      render: (row: any) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
            {row.nombre?.charAt(0)}
          </div>
          {row.nombre}
        </div>
      ),
    },
    { header: "Teléfono", accessor: "telefono" },
    { header: "Correo", accessor: "correo" },
    { header: "Dirección", accessor: "direccion" },

    {
      header: "Acciones",
      accessor: "acciones",
      render: (row: any) => (
        <div className="flex gap-3">
          <button
            onClick={() => {
              setSelected(row);
              setMode("donante");
              setIsFormOpen(true);
            }}
            className="text-blue-600"
          >
            <FiEdit2 />
          </button>

          <button
            onClick={() => {
              setSelected(row);
              setMode("donante");
              setIsDeleteOpen(true);
            }}
            className="text-red-600"
          >
            <FiTrash2 />
          </button>
        </div>
      ),
    },
  ];


  const donanteFields: Field[] = [
    { name: "nombre", label: "Nombre", type: "text" },
    { name: "telefono", label: "Teléfono", type: "text" },
    { name: "correo", label: "Correo", type: "text" },
    { name: "direccion", label: "Dirección", type: "text" },
  ];
  const cleanData = {
  nombre: selected?.nombre || "",
  telefono: selected?.telefono || "",
  correo: selected?.correo || "",
  direccion: selected?.direccion || "",
};


  return (
    <div className="p-6 flex flex-col gap-6">

      <div>
        <h1 className="text-2xl font-semibold">
          Gestión de Donaciones
        </h1>
        <p className="text-sm text-gray-500">
          Donaciones y donantes del sistema
        </p>
      </div>
   
      <div className="bg-white p-4 rounded-xl shadow">

        <div className="flex justify-between mb-4">
          <h2 className="font-semibold">
            Donantes
          </h2>

          <button
            onClick={() => {
              setSelected(null);
              setMode("donante");
              setIsFormOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex gap-2 items-center"
          >
            <FiPlus />
            Nuevo Donante
          </button>
        </div>

        <DataTable
          columns={donantesColumns}
          data={donantes}
        />
      </div>




      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-4">
          Donaciones Recientes
        </h2>

        <DataTable
          columns={donacionesColumns}
          data={donaciones}
        />
      </div>

     
      <FormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={selected ? "Editar Donante" : "Nuevo Donante"}
        fields={donanteFields}
        initialData={cleanData}
        onSubmit={handleSubmitDonante}
      />

      {/* DELETE */}
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteDonante}
        message="¿Eliminar este donante?"
      />
    </div>
  );
};