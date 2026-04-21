import { FiMenu } from "react-icons/fi";
import { useAuth } from "@/providers/AuthProvider"


export const Navbar = ({ toggleSidebar }: any) => {

const { user } = useAuth();
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <FiMenu
          className="text-xl cursor-pointer"
          onClick={toggleSidebar}
        />
        <h1 className="font-semibold text-gray-700">
          Panel de Administración
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium">
            {user?.nombre || "Usuario"}
          </p>
          <p className="text-xs text-gray-500">
            {user?.correo || "correo@email.com"}
          </p>
       </div>

        <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
          {user?.nombre?.charAt(0).toUpperCase() || "U"}
        </div>
      </div>
    </header>
  );
};