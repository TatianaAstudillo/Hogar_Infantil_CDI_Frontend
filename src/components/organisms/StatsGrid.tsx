import { StatCard } from "../molecules/StatCard";
import { FiUsers, FiUser, FiGift, FiBox } from "react-icons/fi";
import api from "@/api/axios";
import { useEffect, useState } from "react";

export const StatsGrid = () => {

  const [stats, setStats] = useState({
    ninos: 0,
    profesores: 0,
    productos: 0,
    stock: 0,
  });

  const loadStats = async () => {
    try {
      const [ninosRes, profesRes, productosRes] =
        await Promise.all([
          api.get("/menor"),
          api.get("/profesora"),
          api.get("/producto"),
          api.get("/producto"),
        ]);

      const ninosActivos = ninosRes.data.filter(
        (n: any) => n.estado === true
      ).length;

      const totalProfes = profesRes.data.length;

  
    const totalProductos = productosRes.data.length;;

    const totalStock = productosRes.data.reduce(
      (acc: number, p: any) => acc + Number(p.stock || 0),
      0
    );

      setStats({
        ninos: ninosActivos,
        profesores: totalProfes,
        productos: totalProductos,
        stock: totalStock,
      });

    } catch (error) {
      console.error("Error cargando stats", error);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

      <StatCard 
        icon={<FiUsers />} 
        value={stats.ninos} 
        label="Niños Activos" 
        color="bg-blue-100 text-blue-700" 
      />

      <StatCard 
        icon={<FiUser />} 
        value={stats.profesores} 
        label="Profesoras" 
        color="bg-purple-100 text-purple-700" 
      />

      <StatCard 
        icon={<FiGift />} 
       value={`${stats.productos}`}
        label="Donaciones" 
        color="bg-green-100 text-green-700" 
      />

      <StatCard 
        icon={<FiBox />} 
        value={stats.stock} 
        label="Productos en Stock" 
        color="bg-orange-100 text-orange-700" 
      />

    </div>
  );
};