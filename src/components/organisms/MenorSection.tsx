import { ProfesoraGroup } from "../molecules/ProfesoraGroup";

export const MenorSection = ({ data, onEdit, onDelete }: any) => {

  const agrupado = data.reduce((acc: any, nino: any) => {
    const key = nino.profesora_nombre || "Sin asignar";

    if (!acc[key]) acc[key] = [];
    acc[key].push(nino);

    return acc;
  }, {});

  return (
    <div>
      {Object.entries(agrupado).map(([profesora, menor]: any) => (
        <ProfesoraGroup
          key={profesora}
          profesora={profesora}
          menor={menor}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};