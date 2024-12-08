/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState } from 'react';
import { FileTextIcon } from 'lucide-react';

import { FileUpload } from '@/components/FileUpload';
import { QueryBuilder } from '@/components/QueryBuilder';
import { DataTable } from '@/components/DataTable';
import { AdSection } from '@/components/AdSection';

import { parseCSV } from '@/lib/csvParser';
import { detectColumnTypes } from '@/lib/columnTypeDetection';
import { applyFilters } from '@/lib/filterOperations';

import { Column } from '@/types/column';
import { FilterGroup } from '@/types/filter';

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [error, setError] = useState<string>('');

  const handleFileSelect = async (file: File) => {
    try {
      const result = await parseCSV(file);
      const detectedColumns = detectColumnTypes(result.data);
      setData(result.data);
      setColumns(detectedColumns);
      setFilteredData(result.data);
      setCurrentPage(1);
      setError('');
    } catch (err) {
      console.error('Error parsing CSV file:', err);
      setError("Error parsing CSV file. Please ensure it's a valid CSV.");
    }
  };

  const handleQueryChange = (filterGroup: FilterGroup) => {
    const filtered = applyFilters(data, filterGroup);
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="">
      <div className="max-w-[1600px] mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-8">
              <FileTextIcon className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-primary">
                CSV Query Parser
              </h1>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <div className="space-y-6">
              {data.length === 0 ? (
                <FileUpload onFileSelect={handleFileSelect} />
              ) : (
                <>
                  <QueryBuilder
                    columns={columns}
                    onQueryChange={handleQueryChange}
                  />
                  <div className="overflow-hidden opacity-[.98] shadow-lg hover:shadow-xl">
                    <DataTable
                      data={paginatedData}
                      columns={columns.map((col) => col.name)}
                      currentPage={currentPage}
                      totalPages={totalPages}
                      pageSize={pageSize}
                      onPageChange={setCurrentPage}
                      onPageSizeChange={handlePageSizeChange}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="lg:block flex flex-col justify-center">
            <div className="lg:sticky lg:top-8">
              <AdSection />
              <div className='mt-3'>
                <a
                  href="https://www.producthunt.com/posts/csv-query-playground?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-csv&#0045;query&#0045;playground"
                  target="_blank"
                >
                  <img
                    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=686638&theme=neutral"
                    alt="CSV&#0032;Query&#0032;Playground - Query&#0032;from&#0032;a&#0032;large&#0032;CSV&#0032;dataset&#0032;clietn&#0032;side | Product Hunt"
                    // style="width: 250px; height: 54px;"
                    width="250"
                    height="54"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
