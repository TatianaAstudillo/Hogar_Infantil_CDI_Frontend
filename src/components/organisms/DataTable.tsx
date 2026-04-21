type Column<T> ={
  header: string;
  accessor: keyof T | string;
  render?: (row: T) => React.ReactNode;
}

type Props<T> ={
  columns: Column<T>[];
  data: T[];
}

export const DataTable = <T,>({ columns, data }: Props<T>) => {
  return (
     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

      <table className="min-w-700px w-full text-left">

        {/* HEADER */}
        <thead className="bg-gray-50">
          <tr className="text-gray-800 text-xs uppercase tracking-wide">
            {columns.map((col, index) => (
              <th key={index} className="px-6 py-3 font-medium">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="text-sm text-gray-700">
          {data.map((row, i) => (
            <tr
              key={i}
              className="border-t border-gray-100 hover:bg-gray-50 transition"
            >
              {columns.map((col, j) => (
                <td key={j} className="px-6 py-4">
                  {col.render
                    ? col.render(row)
                    : (row as any)[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};