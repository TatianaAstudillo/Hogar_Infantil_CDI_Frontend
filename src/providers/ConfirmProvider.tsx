import { createContext, useContext, useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";

type ConfirmOptions = {
  title: string;
  message: string;
  onConfirm: () => void;
};

const ConfirmContext = createContext<any>(null);

export const ConfirmProvider = ({ children }: any) => {
  const [confirm, setConfirm] = useState<ConfirmOptions | null>(null);

  const openConfirm = (options: ConfirmOptions) => {
    setConfirm(options);
  };

  const closeConfirm = () => {
    setConfirm(null);
  };

  return (
    <ConfirmContext.Provider value={{ openConfirm }}>
      {children}

      {/* MODAL GLOBAL */}
      {confirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">

            <div className="flex items-center gap-3 mb-4">
              <FiAlertTriangle className="text-red-500" size={24} />
              <h2 className="text-lg font-semibold">
                {confirm.title}
              </h2>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              {confirm.message}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={closeConfirm}
                className="px-4 py-2 bg-gray-100 rounded-lg"
              >
                Cancelar
              </button>

              <button
                onClick={() => {
                  confirm.onConfirm();
                  closeConfirm();
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Eliminar
              </button>
            </div>

          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => useContext(ConfirmContext);