'use client';

import * as React from 'react';
import { Story } from '@xp-app/types';
import {
  ColumnDef,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
  Checkbox,
} from '@libs/web-ui/index';
import StoryPointView from './storyPointView';

const data: Story[] = [
  {
    id: 0,
    type: 'epic',
    description: 'test',
    content: 'test',
    point: 4,
    assignee: null,
    parentStory: null,
    childStories: [],
  },
  {
    id: 1,
    type: 'story',
    description: 'test2',
    content: 'test2',
    point: 2,
    assignee: null,
    parentStory: null,
    childStories: [],
  },
  {
    id: 2,
    type: 'spike',
    description: 'test3',
    content: 'test3',
    point: 3,
    assignee: null,
    parentStory: null,
    childStories: [],
  },
  {
    id: 5,
    type: 'story',
    description: 'test4',
    content: 'test4',
    point: 5,
    assignee: null,
    parentStory: null,
    childStories: [],
  },
];

export const columns: ColumnDef<Story>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'type',
    header: '스토리 타입',
    cell: ({ row }) => <div className="capitalize">{row.getValue('type')}</div>,
  },
  {
    accessorKey: 'description',
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('description')}</div>
    ),
  },
  {
    accessorKey: 'point',
    header: '포인트',
    cell: ({ row, column, getValue, table }) => {
      const onSubmit = (value: number) => {
        // @ts-expect-error: Unreachable code error
        table.options.meta?.updateData?.bind(row.index, column.id, null);
      };
      return <StoryPointView value={getValue() as number} />;
    },
  },
];

export function AllStoryView() {
  const [tableData, setTableData] = React.useState(data);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    meta: {
      updateData: (rowIndex: number, columnId: string, value: string) =>
        setTableData((prev) =>
          prev.map((row, index) =>
            index === rowIndex
              ? {
                  ...prev[rowIndex],
                  [columnId]: value,
                }
              : row
          )
        ),
    },
    state: {
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-end py-4">
        <Button>스프린트 만들기</Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
