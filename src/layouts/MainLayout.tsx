import { Sidebar } from "../components/organisms/Sidebar";
import { Navbar } from "../components/organisms/Navbar";
import { useState } from "react";

export const MainLayout = ({ children }: any) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isOpen} />

      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={() => setIsOpen(!isOpen)} />
        <main className="p-6 bg-gray-50 flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};