export type ColumnType = 'text' | 'number' | 'date' | 'boolean';

export interface Column {
  name: string;
  type: ColumnType;
}
