import React from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Column } from '../types/column';
import { Filter, Operator } from '../types/filter';

type GetOperatorsType = { value: Operator; label: string };

interface FilterRowProps {
  filter: Filter;
  columns: Column[];
  onUpdate: (filter: Filter) => void;
  onRemove: () => void;
  isOnly: boolean;
  onAdd: () => void;
}

export function FilterRow({
  filter,
  columns,
  onUpdate,
  onRemove,
  isOnly,
  onAdd,
}: FilterRowProps) {
  const getOperators = (
    columnType: Column['type']
  ): GetOperatorsType[] => {
    const commonOperators: GetOperatorsType[] = [
      { value: 'equals', label: 'Equals' },
      { value: 'notEquals', label: 'Not equals' },
      { value: 'isNull', label: 'Is empty' },
      { value: 'isNotNull', label: 'Is not empty' },
    ];

    switch (columnType) {
      case 'text':
        return [
          ...commonOperators,
          { value: 'contains', label: 'Contains' },
          { value: 'notContains', label: 'Does not contain' },
          { value: 'startsWith', label: 'Starts with' },
          { value: 'endsWith', label: 'Ends with' },
        ];
      case 'number':
        return [
          ...commonOperators,
          { value: 'greaterThan', label: 'Greater than' },
          { value: 'lessThan', label: 'Less than' },
          { value: 'between', label: 'Between' },
        ];
      case 'date':
        return [
          ...commonOperators,
          { value: 'before', label: 'Before' },
          { value: 'after', label: 'After' },
          { value: 'onDate', label: 'On date' },
          { value: 'between', label: 'Between' },
        ];
      default:
        return commonOperators;
    }
  };

  const selectedColumn = columns.find((col) => col.name === filter.column);
  const operators = selectedColumn ? getOperators(selectedColumn.type) : [];

  return (
    <div className="flex flex-wrap items-center gap-4">
      <select
        className="flex-1 min-w-[200px] p-2 border rounded-md"
        value={filter.column}
        onChange={(e) => {
          const column = columns.find((col) => col.name === e.target.value);
          if (column) {
            onUpdate({
              ...filter,
              column: column.name,
              columnType: column.type,
              operator: getOperators(column.type)[0].value,
              value: '',
            });
          }
        }}
      >
        <option value="">Select column</option>
        {columns.map((column) => (
          <option key={column.name} value={column.name}>
            {column.name}
          </option>
        ))}
      </select>

      <select
        className="flex-1 min-w-[150px] p-2 border rounded-md"
        value={filter.operator}
        onChange={(e) =>
          onUpdate({ ...filter, operator: e.target.value as Operator })
        }
      >
        {operators.map((op) => (
          <option key={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>

      {filter.operator !== 'isNull' &&
        filter.operator !== 'isNotNull' &&
        (filter.operator === 'between' ? (
          <div className="flex-1 min-w-[200px] flex gap-2">
            <input
              type={selectedColumn?.type === 'date' ? 'date' : 'text'}
              className="flex-1 p-2 border rounded-md"
              placeholder="Start value..."
              value={(filter.value as string[])[0] || ''}
              onChange={(e) =>
                onUpdate({
                  ...filter,
                  value: [e.target.value, (filter.value as string[])[1] || ''],
                })
              }
            />
            <input
              type={selectedColumn?.type === 'date' ? 'date' : 'text'}
              className="flex-1 p-2 border rounded-md"
              placeholder="End value..."
              value={(filter.value as string[])[1] || ''}
              onChange={(e) =>
                onUpdate({
                  ...filter,
                  value: [(filter.value as string[])[0] || '', e.target.value],
                })
              }
            />
          </div>
        ) : (
          <input
            type={selectedColumn?.type === 'date' ? 'date' : 'text'}
            className="flex-1 min-w-[200px] p-2 border rounded-md"
            placeholder="Enter value..."
            value={filter.value as string}
            onChange={(e) => onUpdate({ ...filter, value: e.target.value })}
          />
        ))}

      <div className="flex gap-2">
        {!isOnly && (
          <Button
            onClick={onRemove}
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-600 hover:bg-red-100"
            title="Remove filter"
          >
            <MinusCircle className="w-5 h-5" />
          </Button>
        )}
        <Button
          onClick={onAdd}
          variant="ghost"
          size="icon"
          className='text-primary hover:text-primary-dark hover:bg-primary/10'
          title="Add filter"
        >
          <PlusCircle className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
