import dayjs from 'dayjs';
import { Filter, FilterGroup } from '../types/filter';

export function applyFilters(data: any[], filterGroup: FilterGroup): any[] {
  return data.filter((row) => {
    const results = filterGroup.filters.map((filter) =>
      evaluateFilter(row, filter)
    );
    return filterGroup.conjunction === 'AND'
      ? results.every(Boolean)
      : results.some(Boolean);
  });
}

function evaluateFilter(row: any, filter: Filter): boolean {
  const value = row[filter.column];

  if (filter.operator === 'isNull') {
    return value === null || value === undefined || value === '';
  }

  if (filter.operator === 'isNotNull') {
    return value !== null && value !== undefined && value !== '';
  }

  if (!value) return false;

  switch (filter.columnType) {
    case 'date':
      return evaluateDateFilter(value, filter);
    case 'number':
      return evaluateNumberFilter(value, filter);
    default:
      return evaluateTextFilter(String(value), filter);
  }
}

function evaluateDateFilter(value: string, filter: Filter): boolean {
  const date = dayjs(value);
  const filterDate = dayjs(filter.value as string);

  switch (filter.operator) {
    case 'before':
      return date.isBefore(filterDate);
    case 'after':
      return date.isAfter(filterDate);
    case 'onDate':
      return date.isSame(filterDate, 'day');
    case 'between':
      const [start, end] = filter.value as string[];
      return date.isAfter(dayjs(start)) && date.isBefore(dayjs(end));
    default:
      return false;
  }
}

function evaluateNumberFilter(value: string | number, filter: Filter): boolean {
  const num = Number(value);
  const filterValue = Number(filter.value);

  switch (filter.operator) {
    case 'equals':
      return num === filterValue;
    case 'notEquals':
      return num !== filterValue;
    case 'greaterThan':
      return num > filterValue;
    case 'lessThan':
      return num < filterValue;
    case 'between':
      const [min, max] = (filter.value as string[]).map(Number);
      return num >= min && num <= max;
    default:
      return false;
  }
}

function evaluateTextFilter(value: string, filter: Filter): boolean {
  const text = value.toLowerCase();
  const filterValue = (filter.value as string).toLowerCase();

  switch (filter.operator) {
    case 'equals':
      return text === filterValue;
    case 'notEquals':
      return text !== filterValue;
    case 'contains':
      return text.includes(filterValue);
    case 'notContains':
      return !text.includes(filterValue);
    case 'startsWith':
      return text.startsWith(filterValue);
    case 'endsWith':
      return text.endsWith(filterValue);
    default:
      return false;
  }
}
