import {
  FiHome,
  FiUsers,
  FiUser,
  FiGift,
  FiBox,
  FiBarChart2,
  FiLogOut,
  FiFileText,
} from "react-icons/fi";

import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import logo from "@/assets/images/logo.png";

const menu = [
  { name: "Panel de control", icon: <FiHome />, path: "/dashboard" },
  { name: "Niños", icon: <FiUsers />, path: "/menor" }, // 👈 se queda así
  { name: "Personal", icon: <FiUser />, path: "/personal" },
  { name: "Donaciones", icon: <FiGift />, path: "/donaciones" },
  { name: "Inventario", icon: <FiBox />, path: "/inventario" },
  { name: "Reportes", icon: <FiBarChart2 />, path: "/reportes" },
  { name: "Seguimiento Menor", icon: <FiFileText />, path: "/seguimiento" },
];

export const Sidebar = ({ isOpen }: any) => {
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <aside
      className={`h-screen bg-white border-r border-gray-200 transition-all duration-300 flex flex-col
        ${isOpen ? "w-64" : "w-20"}`}
    >
      {/* LOGO */}
      <div className="flex items-center gap-2 px-4 h-16">
        <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
        {isOpen && (
          <span className="font-semibold text-gray-700">SIGEH</span>
        )}
      </div>

      {/* MENU */}
      <nav className="flex-1 px-2 space-y-2">
        {menu.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link to={item.path} key={item.name}>
              <div
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition
                ${
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <span className="text-lg">{item.icon}</span>

                {isOpen && (
                  <span className="text-sm font-medium">
                    {item.name}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <div className="p-4 border-t border-gray-200 mt-auto">
        <div
          onClick={logout}
          className="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-red-500"
        >
          <FiLogOut />
          {isOpen && <span>Cerrar sesión</span>}
        </div>
      </div>
    </aside>
  );
};