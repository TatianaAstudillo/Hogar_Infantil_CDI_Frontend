import { Props } from "@/features/menor/types/menor.types";

export const MenorFilters = ({
  filters,
  setFilters,
  profesoras = [],
}: Props) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 grid md:grid-cols-3 gap-4">

      {/* 🔍 BUSCAR */}
      <div className="flex flex-col gap-1 w-full">
        <label className="text-xs text-gray-500 mb-1">
          Buscar
        </label>
        <input
          type="text"
          placeholder="Nombre del niño..."
          value={filters.search}
          onChange={(e) =>
            setFilters({ ...filters, search: e.target.value })
          }
          className="border border-gray-200 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      {/* 👩‍🏫 PROFESORA */}
      <div className="flex flex-col gap-1 w-full">
        <label className="text-xs text-gray-500 mb-1">
          Profesora
        </label>
        <select
          value={filters.profesora}
          onChange={(e) =>
            setFilters({ ...filters, profesora: e.target.value })
          }
          className="border border-gray-200 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          <option value="">Todas</option>

          {profesoras.map((p: any) => (
            <option key={p.id_profesora} value={p.nombre}>
              {p.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* 📊 ESTADO */}
      <div className="flex flex-col gap-1 w-full">
        <label className="text-xs text-gray-500 mb-1">
          Estado
        </label>
        <select
          value={filters.estado}
          onChange={(e) =>
            setFilters({ ...filters, estado: e.target.value })
          }
          className="border border-gray-200 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          <option value="">Todos</option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </div>

    </div>
  );
};



