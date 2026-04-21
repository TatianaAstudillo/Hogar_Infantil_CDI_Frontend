import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../components/pages/LoginPage";
import DashboardPage from "../components/pages/DashboardPage";
import { NinosPage } from "@/components/pages/MenorPage";
import { PrivateRoute } from "./PrivateRoute";
import { MainLayout } from "@/layouts/MainLayout";
import { UsuariosPage } from "@/components/pages/UsuarioPage";
import { DonacionesPage } from "@/components/pages/DonacionesPage";
import { InventarioPage } from "@/components/pages/InventarioPage";
import { ReportesPage } from "@/components/pages/ReportesPage";
import { SeguimientoPage } from "@/components/pages/SeguimientoPage";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route path="/login" element={<LoginPage />} />

        {/* DASHBOARD */}
       <Route
          path="/dashboard"
          element={
            <PrivateRoute>
                <DashboardPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/menor"
          element={
            <PrivateRoute>
              <MainLayout>
                <NinosPage />
              </MainLayout>
            </PrivateRoute>
          }
        />
         <Route
          path="/personal"
          element={
            <PrivateRoute>
              <MainLayout>
                < UsuariosPage/>
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/donaciones"
          element={
            <PrivateRoute>
              <MainLayout>
                < DonacionesPage/>
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/inventario"
          element={
            <PrivateRoute>
              <MainLayout>
                <InventarioPage/>
              </MainLayout>
            </PrivateRoute>
          }
        />
         <Route
          path="/reportes"
          element={
            <PrivateRoute>
              <MainLayout>
                <ReportesPage/>
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/seguimiento"
          element={
            <PrivateRoute>
              <MainLayout>
                <SeguimientoPage/>
              </MainLayout>
            </PrivateRoute>
          }
        />

        {/* REDIRECCIÓN DEFAULT */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};