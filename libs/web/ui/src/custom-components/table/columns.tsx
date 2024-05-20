import { Story } from '@xp-app/types';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '../../components/checkbox';

export const columns: ColumnDef<Story>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className="grid items-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="grid items-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
  },
  {
    accessorKey: 'type',
    header: 'type',
  },
  {
    accessorKey: 'description',
    header: 'description',
  },
  {
    accessorKey: 'point',
    header: 'point',
  },
];
