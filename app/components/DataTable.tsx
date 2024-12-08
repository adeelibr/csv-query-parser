import React from 'react';
import { Pagination } from './Pagination';

interface DataTableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  columns: string[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export function DataTable({
  data,
  columns,
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: DataTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={data.length}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />

      <div className="overflow-x-auto">
        <table className="w-full table-fixed divide-y divide-border">
          <thead>
            <tr className="bg-gray-50">
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-[200px] min-w-[200px]"
                >
                  <div className="truncate" title={column}>
                    {column}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-8 text-center text-sm text-gray-500"
                >
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {columns.map((column) => (
                    <td
                      key={column}
                      className="px-6 py-4 text-sm text-gray-600 w-[200px] min-w-[200px]"
                    >
                      <div className="truncate" title={row[column]}>
                        {row[column]}
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={data.length}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
}
