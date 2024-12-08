import Papa from 'papaparse';

export interface ParseResult {
  data: any[];
  columns: string[];
  error?: string;
}

export async function parseCSV(file: File): Promise<ParseResult> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          reject(new Error('Error parsing CSV file'));
          return;
        }

        const columns = results.meta.fields || [];
        resolve({
          data: results.data,
          columns,
        });
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}
