import { DataTable } from "../../../components/organisms/DataTable";
import { useDashboardTable } from "../hook/useDashboardTable";
import { PriorityDot } from "../../../components/atoms/priorityDot";
import { Badge } from "../../../components/atoms/Badge";

export const DashboardTable = () => {
  const { data, isLoading, error } = useDashboardTable();

    if (isLoading) return <p>Cargando tabla...</p>;

    if (error) return <p>Error cargando datos</p>;

    if (!data || data.length === 0)
      return <p>No hay datos disponibles</p>;

  const columns = [
    
    {
      header: "Prioridad",
      accessor: "prioridad",
      render: (row: any) =>
        <PriorityDot level={row.prioridad}
       />
    },
    {
      header: "Nombre del Niño",
      accessor: "nombre",
    },
    {
      header: "Categoría",
      accessor: "categoria",
      render: (row: any) => <Badge text={row.categoria} />,
    },
    {
      header: "Novedad",
      accessor: "novedad",
    },
    {
      header: "Fecha",
      accessor: "fecha",
      render: (row: any) => {
        const date = new Date(row.fecha);
        return date.toLocaleDateString("es-CO", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
        },
      }
  ];

  return <DataTable columns={columns} data={data || []} />;


};