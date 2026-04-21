import { FiX } from "react-icons/fi";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  message: string;
};

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}: Props) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl p-6 w-full max-w-sm relative">

        <button
          onClick={onClose}
          className="absolute right-4 top-4"
        >
          <FiX />
        </button>

        <p className="text-gray-700 mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 rounded-lg"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Eliminar
          </button>
        </div>

      </div>
    </div>
  );
};