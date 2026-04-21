import { MainLayout } from "../../layouts/MainLayout";
import { StatsGrid } from "../../components/organisms/StatsGrid";
import { DashboardTable } from "../../features/dashboard/components/DashboardTable";
import { useDashboard } from "../../features/dashboard/hook/useDashboard";

const DashboardPage = () => {
  const { isLoading } = useDashboard();
  

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold">Bienvenido al Panel de Control</h1>
      <p className="text-gray-500 mb-6">
        Resumen general del Hogar de Niños
      </p>

      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <>
          {<StatsGrid />}

          <div className="mt-6">
            <div className="bg-white rounded-xl shadow-sm p-4">
            {/* HEADER ARRIBA */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Seguimiento Menor - Novedades Recientes
              </h2>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="text-gray-600">Alta</span>
                </div>

                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                  <span className="text-gray-600">Media</span>
                </div>

                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <span className="text-gray-600">Baja</span>
                </div>
              </div>
            </div>

            <DashboardTable />
          </div>
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default DashboardPage;