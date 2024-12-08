import { ColumnType } from './column';

export type Operator =
  | 'equals'
  | 'notEquals'
  | 'contains'
  | 'notContains'
  | 'startsWith'
  | 'endsWith'
  | 'isNull'
  | 'isNotNull'
  | 'greaterThan'
  | 'lessThan'
  | 'between'
  | 'before'
  | 'after'
  | 'onDate';

export interface Filter {
  id: string;
  column: string;
  operator: Operator;
  value: string | string[];
  columnType: ColumnType;
}

export type FilterGroup = {
  filters: Filter[];
  conjunction: 'AND' | 'OR';
};
