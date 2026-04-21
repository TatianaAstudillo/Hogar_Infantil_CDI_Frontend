import { FiX } from "react-icons/fi";
import { useEffect, useState } from "react";

export type Field = {
  name: string;
  label: string;
  type: "text" | "date" | "select";
  options?: { label: string; value: any }[];
};

export type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: Field[];
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
};

export const FormModal = ({
  isOpen,
  onClose,
  title,
  fields,
  initialData = {},
  onSubmit,
}: Props) => {

  const [form, setForm] = useState<any>({});

  useEffect(() => {
    setForm(initialData || {});
  }, [initialData]);

  useEffect(() => {
  if (initialData) {
    const formattedData = { ...initialData };

    // 🔥 convertir fechas correctamente
    Object.keys(formattedData).forEach((key) => {
      if (
        formattedData[key] &&
        typeof formattedData[key] === "string" &&
        formattedData[key].includes("T")
      ) {
        formattedData[key] = formattedData[key].split("T")[0];
      }
    });

    setForm(formattedData);
  }
}, [initialData]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setForm((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl w-full max-w-md p-6 relative">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4"
        >
          <FiX />
        </button>

        <h2 className="text-lg font-semibold mb-4">{title}</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {fields.map((field) => (
            <div key={field.name} className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">
                {field.label}
              </label>

              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={form[field.name] || ""}
                  onChange={handleChange}
                  className="border border-gray-200 rounded-lg px-3 py-2"
                >
                  <option value="">Seleccionar</option>

                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name] || ""}
                  onChange={handleChange}
                  className="border border-gray-200 rounded-lg px-3 py-2"
                />
              )}
            </div>
          ))}

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 rounded-lg"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Guardar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};