import dayjs from 'dayjs';
import { Column, ColumnType } from '../types/column';

export function detectColumnTypes(data: any[]): Column[] {
  if (data.length === 0) return [];

  const firstRow = data[0];
  return Object.keys(firstRow).map((name) => ({
    name,
    type: detectColumnType(data, name),
  }));
}

function detectColumnType(data: any[], columnName: string): ColumnType {
  const values = data
    .slice(0, 100)
    .map((row) => row[columnName])
    .filter((value) => value !== null && value !== undefined && value !== '');

  if (values.length === 0) return 'text';

  const allNumbers = values.every((value) => !isNaN(Number(value)));
  if (allNumbers) return 'number';

  const allDates = values.every((value) => dayjs(value).isValid());
  if (allDates) return 'date';

  const allBooleans = values.every(
    (value) =>
      typeof value === 'boolean' ||
      ['true', 'false', '0', '1'].includes(String(value).toLowerCase())
  );
  if (allBooleans) return 'boolean';

  return 'text';
}
