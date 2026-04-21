import { MenorCard } from "../molecules/StatCard";

export const ProfesoraGroup = ({ profesora, menor, onEdit, onDelete }: any) => {
  return (
    <div className="mb-10">

      {/* HEADER PROFESORA */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center text-lg">
          👩‍🏫
        </div>

        <div>
          <h2 className="font-semibold text-lg">
            Profesora {profesora}
          </h2>
          <span className="text-sm text-gray-500">
            {menor.length} niños
          </span>
        </div>
      </div>

      {/* GRID DE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {menor.map((menor: any) => (
          <MenorCard
            key={menor.id_menor}
            menor={menor}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};