import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useMenor } from "@/features/menor/hooks/useMenor";
import { MenorFilters } from "../molecules/MenorFilters";
import { MenorSection } from "../organisms/MenorSection";
import { CreateMenorModal } from "@/components/organisms/CreateMenorModal";
import { EditMenorModal } from "@/components/organisms/EditMenorModal";
import { deleteMenor } from "@/features/menor/services/menor.service";
import { useConfirm } from "@/providers/ConfirmProvider";
import api from "@/api/axios";

export const NinosPage = () => {
  const {
    data: ninos = [],
    isLoading,
    refetch,
  } = useMenor();

  const [filters, setFilters] = useState({
    search: "",
    profesora: "",
    estado: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [selectedMenor, setSelectedMenor] = useState<any>(null);
  const [profesoras, setProfesoras] = useState<any[]>([]);

  // 🔥 CARGAR PROFESORAS
  const loadProfesores = async () => {
    try {
      const { data } = await api.get("/profesora");
      setProfesoras(data);
    } catch (error) {
      console.error("Error cargando profesoras", error);
    }
  };

  useEffect(() => {
    loadProfesores();
  }, []);

 
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    refetch();
  };


  const handleEdit = (menor: any) => {
    setSelectedMenor(menor);
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
    setSelectedMenor(null);
    refetch();
  };


  const { openConfirm } = useConfirm();
  const handleDelete = (id: number) => {
      openConfirm({
        title: "Eliminar niño",
        message: "Esta acción no se puede deshacer",
        onConfirm: async () => {
          try {
            await deleteMenor(id);
            refetch();
          } catch (error) {
            console.error("Error eliminando menor", error);
          }
        },
      });
    };


  const filtered = ninos.filter((n: any) => {
    const fullName = `${n.nombre} ${n.apellido}`.toLowerCase();

    return (
      fullName.includes(filters.search.toLowerCase()) &&
      (filters.profesora
        ? n.profesora_nombre === filters.profesora
        : true) &&
      (filters.estado
        ? n.estado === (filters.estado === "activo")
        : true)
    );
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Cargando niños...</p>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col gap-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">
            Gestión de Niños
          </h1>

          <p className="text-sm text-gray-500">
            Administra la información de los niños del hogar (2-5 años)
          </p>
        </div>

        <button
          onClick={openModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm"
        >
          <FiPlus />
          Agregar Niño
        </button>
      </div>

      {/* FILTROS */}
      <MenorFilters
        filters={filters}
        setFilters={setFilters}
        profesoras={profesoras}
      />

      {/* CONTENIDO */}
      {filtered.length === 0 ? (
        <div className="bg-white p-6 rounded-xl border border-gray-200 text-center text-gray-500">
          No hay niños registrados
        </div>
      ) : (
        <MenorSection
          data={filtered}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* MODAL CREAR */}
      <CreateMenorModal
        isOpen={isModalOpen}
        onClose={closeModal}
        profesoras={profesoras}
        refetch={refetch}
      />

      {/* MODAL EDITAR */}
      <EditMenorModal
        isOpen={isEditOpen}
        onClose={closeEdit}
        menor={selectedMenor}
        refetch={refetch}
      />

    </div>
  );
};