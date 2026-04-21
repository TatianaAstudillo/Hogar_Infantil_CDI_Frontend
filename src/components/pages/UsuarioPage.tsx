import { useEffect, useState } from "react";
import { FiPlus, FiEdit2, FiTrash2} from "react-icons/fi";
import { DataTable } from "@/components/organisms/DataTable";
import { FormModal, Field } from "@/components/modals/FormModal";
import { ConfirmModal } from "@/components/modals/ConfirModal";
import { PasswordCell } from "@/components/atoms/PasswordCell";
import api from "@/api/axios";

export const UsuariosPage = () => {

  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState<any>(null);

  // 🔥 GET USERS
  const loadUsuarios = async () => {
    try {
      const { data } = await api.get("/usuario");
      setUsuarios(data);
    } catch (error) {
      console.error("Error cargando usuarios", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsuarios();
  }, []);


  const handleSubmit = async (form: any) => {
    try {
      const payload = {
        ...form,
        estado: form.estado === "true" || form.estado === true,
      };

      if (selectedUser) {
        await api.put(`/usuario/${selectedUser.id_usuario}`, payload);
      } else {
        await api.post("/usuario", payload);
      }

      loadUsuarios();
    } catch (error) {
      console.error("Error guardando usuario", error);
    }
  };

  // 🔥 DELETE
  const handleDelete = async () => {
    try {
      await api.delete(`/usuario/${selectedUser.id_usuario}`);
      setIsDeleteOpen(false);
      loadUsuarios();
    } catch (error) {
      console.error("Error eliminando usuario", error);
    }
  };

  // 🔥 COLUMNAS
  const columns = [
    {
      header: "Nombre",
      accessor: "nombre",
      render: (row: any) => {
        const initial = row.nombre?.charAt(0).toUpperCase() || "?";

        return (
          <div className="flex items-center gap-3">

            {/* AVATAR */}
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">
                {initial}
              </span>
            </div>

            {/* TEXTO */}
            <div className="flex flex-col leading-tight">
              <span className="font-medium text-gray-800">
                {row.nombre}
              </span>
              <span className="text-xs text-gray-400">
                {row.apellido}
              </span>
            </div>

          </div>
        );
      },
    },

    { header: "Correo", accessor: "correo" },
    {
    header: "Contraseña",
    accessor: "contrasena_hash",
    render: () => <PasswordCell />
    },
    { header: "Rol", accessor: "rol" },

    {
      header: "Estado",
      accessor: "estado",
      render: (row: any) => {
        return (
          <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${
            row.estado
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {row.estado ? "Activo" : "Inactivo"}
        </span>
          
        );
      },
    },

    {
      header: "Fecha creación",
      accessor: "fecha_creacion",
      render: (row: any) =>
        new Date(row.fecha_creacion).toLocaleDateString(),
    },

    {
      header: "Acciones",
      accessor: "acciones",
      render: (row: any) => (
        <div className="flex justify-end gap-2">

          <button
            onClick={() => {
              setSelectedUser(row);
              setIsFormOpen(true);
            }}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <FiEdit2 className="text-blue-600 font-semibold text-sm" />
          </button>

          <button
            onClick={() => {
              setSelectedUser(row);
              setIsDeleteOpen(true);
            }}
            className="p-2 rounded-lg hover:bg-red-50"
          >
            <FiTrash2 className="text-red-500" />
          </button>

        </div>
      ),
    },
  ];

  // 🔥 CAMPOS FORM
  const userFields: Field[] = [
    { name: "nombre", label: "Nombre", type: "text" },
    { name: "apellido", label: "Apellido", type: "text" },
    { name: "correo", label: "Correo", type: "text" },

    // 🔐 solo se usa en create realmente
    { name: "contrasena_hash", label: "Contraseña", type: "text" },

    {
      name: "rol",
      label: "Rol",
      type: "select",
      options: [
        { label: "Administrador", value: "administracion" },
        { label: "Profesora", value: "profesora" },
        { label: "Psicóloga", value: "psicologa" },
        { label: "Enfermera", value: "enfermera" },
      ],
    },
    {
      name: "estado",
      label: "Estado",
      type: "select",
      options: [
        { label: "Activo", value: "true" },
        { label: "Inactivo", value: "false" },
      ],
    },
  ];

  if (loading) {
    return <p className="p-6 text-gray-500">Cargando usuarios...</p>;
  }

  return (
    <div className="p-6 flex flex-col gap-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">
            Gestión de Personal
          </h1>
          <p className="text-sm text-gray-500">
            Administra el equipo de trabajo del hogar
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedUser(null);
            setIsFormOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm"
        >
          <FiPlus />
          Agregar Personal
        </button>
      </div>

      {/* TABLA */}
      <DataTable columns={columns} data={usuarios} />

      {/* MODAL FORM */}
      <FormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={selectedUser ? "Editar Usuario" : "Agregar Usuario"}
        fields={userFields}
        initialData={selectedUser}
        onSubmit={handleSubmit}
      />

      {/* MODAL DELETE */}
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        message="¿Seguro que deseas eliminar este usuario?"
      />

    </div>
  );
};