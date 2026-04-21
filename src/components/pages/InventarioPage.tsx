import { useEffect, useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiBox, FiAlertTriangle, FiLayers} from "react-icons/fi";
import { DataTable } from "@/components/organisms/DataTable";
import { FormModal, Field } from "@/components/modals/FormModal";
import { ConfirmModal } from "@/components/modals/ConfirModal";
import api from "@/api/axios";

export const InventarioPage = () => {

  const [productos, setProductos] = useState<any[]>([]);
  const [donantes, setDonantes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedProducto, setSelectedProducto] = useState<any>(null);


  const loadData = async () => {
    try {
      const [productosRes, donantesRes] = await Promise.all([
        api.get("/producto"),
        api.get("/donante"),
      ]);

      setProductos(productosRes.data);
      setDonantes(donantesRes.data);

    } catch (error) {
      console.error("Error cargando datos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);


 const handleSubmit = async (form: any) => {
  try {
    const basePayload = {
      nombre: form.nombre,
      categoria: form.categoria,
      stock: Number(form.stock),
      stock_minimo: Number(form.stock_minimo),
      estado: form.estado === "true",
      fecha_vencimiento: form.fecha_vencimiento || null,
    };
    if (!selectedProducto) {
      const payload = {
        ...basePayload,
        id_donante: Number(form.id_donante),
        fecha_donacion: form.fecha_donacion,
      };

      await api.post("/producto", payload);
    } 

    
    else {
      await api.put(
        `/producto/${selectedProducto.id_producto}`,
        basePayload
      );
    }

    loadData();

  } catch (error) {
    console.error("Error guardando producto", error);
  }
};


  const handleDelete = async () => {
    try {
      await api.delete(`/producto/${selectedProducto.id_producto}`);
      setIsDeleteOpen(false);
      loadData();
    } catch (error) {
      console.error("Error eliminando producto", error);
    }
  };

  const lowStock = productos.filter(
    (p: any) => p.stock <= p.stock_minimo
  );

  const columns = [
    { header: "Producto", accessor: "nombre" },

    {
      header: "Categoría",
      accessor: "categoria",
      render: (row: any) => (
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
          {row.categoria}
        </span>
      ),
    },

    { header: "Stock", accessor: "stock" },
    { header: "Stock mínimo", accessor: "stock_minimo" },

    {
      header: "Estado",
      accessor: "estado",
      render: (row: any) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          row.stock <= row.stock_minimo
            ? "bg-red-100 text-red-600"
            : "bg-green-100 text-green-700"
        }`}>
          {row.stock <= row.stock_minimo ? "Bajo" : "Alto"}
        </span>
      ),
    },

    {
      header: "Fecha",
      accessor: "fecha_vencimiento",
      render: (row: any) =>
        row.fecha_vencimiento
          ? new Date(row.fecha_vencimiento).toLocaleDateString()
          : "—",
    },

    {
      header: "Acciones",
      accessor: "acciones",
      render: (row: any) => (
        <div className="flex gap-3">
          <button
            onClick={() => {
              setSelectedProducto(row);
              setIsFormOpen(true);
            }}
            className="text-blue-600"
          >
            <FiEdit2 />
          </button>

          <button
            onClick={() => {
              setSelectedProducto(row);
              setIsDeleteOpen(true);
            }}
            className="text-red-600"
          >
            <FiTrash2 />
          </button>
        </div>
      ),
    },
  ];

  const productoFieldsCreate: Field[] = selectedProducto
  ? [
      { name: "nombre", label: "Producto", type: "text" },
      {
        name: "categoria",
        label: "Categoría",
        type: "select",
        options: [
          { label: "Material Escolar", value: "Material Escolar" },
          { label: "Alimentación", value: "Alimentación" },
          { label: "Ropa", value: "Ropa" },
        ],
      },
      { name: "stock", label: "Stock", type: "text" },
      { name: "stock_minimo", label: "Stock mínimo", type: "text" },
      { name: "fecha_vencimiento", label: "Fecha vencimiento", type: "date" },
      {
        name: "estado",
        label: "Estado",
        type: "select",
        options: [
          { label: "Activo", value: "true" },
          { label: "Inactivo", value: "false" },
        ],
      },
    ]
  : [
    
      { name: "nombre", label: "Producto", type: "text" },
      {
        name: "categoria",
        label: "Categoría",
        type: "select",
        options: [
          { label: "Material Escolar", value: "Material Escolar" },
          { label: "Alimentación", value: "Alimentación" },
          { label: "Administracion", value: "Administracion" },
        ],
      },
      { name: "stock", label: "Stock", type: "text" },
      { name: "stock_minimo", label: "Stock mínimo", type: "text" },
      { name: "fecha_vencimiento", label: "Fecha vencimiento", type: "date" },
      {
        name: "estado",
        label: "Estado",
        type: "select",
        options: [
          { label: "Activo", value: "true" },
          { label: "Inactivo", value: "false" },
        ],
      },
      {
        name: "id_donante",
        label: "Donante",
        type: "select",
        options: donantes.map((d: any) => ({
          label: d.nombre,
          value: d.id_donante,
        })),
      },
      {
        name: "fecha_donacion",
        label: "Fecha Donación",
        type: "date",
      },
    ];

  const productoFieldsEdit: Field[] = productoFieldsCreate.filter(
    (f) => f.name !== "id_donante" && f.name !== "fecha_donacion"
  );

  if (loading) {
    return <p className="p-6 text-gray-500">Cargando inventario...</p>;
  }

  return (
    <div className="p-6 flex flex-col gap-6">

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">
            Gestión de Inventario
          </h1>
          <p className="text-sm text-gray-500">
            Administra los productos del hogar
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedProducto(null);
            setIsFormOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FiPlus />
          Agregar Producto
        </button>
      </div>

      {/* CARDS */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

  {/* TOTAL PRODUCTOS */}
  <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-sm">Total Productos</p>
      <h2 className="text-xl font-semibold">
        {productos.length}
      </h2>
    </div>

    <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
      <FiBox size={20} />
    </div>
  </div>

  {/* TOTAL UNIDADES */}
  <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-sm">Total Unidades</p>
      <h2 className="text-xl font-semibold">
        {productos.reduce((acc, p) => acc + p.stock, 0)}
      </h2>
    </div>

    <div className="bg-green-100 text-green-600 p-3 rounded-full">
      <FiLayers size={20} />
    </div>
  </div>

  {/* STOCK BAJO */}
  <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-sm">Stock Bajo</p>
      <h2 className="text-xl font-semibold text-red-600">
        {lowStock.length}
      </h2>
    </div>

    <div className="bg-red-100 text-red-600 p-3 rounded-full">
      <FiAlertTriangle size={20} />
    </div>
  </div>

</div>

      {/* ALERTA */}
      {lowStock.length > 0 && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl">
          <strong>Alerta de Stock Bajo:</strong>{" "}
          {lowStock.map((p) => p.nombre).join(", ")}
        </div>
      )}

      {/* TABLA */}
      <DataTable columns={columns} data={productos} />

      {/* MODAL */}
      <FormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={selectedProducto ? "Editar Producto" : "Agregar Producto"}
        fields={selectedProducto ? productoFieldsEdit : productoFieldsCreate}
        initialData={selectedProducto}
        onSubmit={handleSubmit}
      />

      {/* DELETE */}
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        message="¿Eliminar este producto?"
      />
    </div>
  );
};