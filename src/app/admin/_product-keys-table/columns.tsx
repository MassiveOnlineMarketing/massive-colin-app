"use client";

import { ColumnDef } from "@tanstack/react-table";
import { StandardHeaderCell, StandardRowCell } from "@/components/ui/table";

import { Checkbox } from "@/components/ui/checkbox";
import { Key } from "@prisma/client";



export const columns = (): ColumnDef<Key>[] => [
    // * Select column
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="rounded-[4px] border-gray-300 border-[1.5px]"
        />
      ),
      cell: ({ row }) => (
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
          }}
        >
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="rounded-[4px] border-gray-300 border-[1.5px]"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    // * Id
    {
      accessorKey: "id",
      header: ({ column }) => (
        <StandardHeaderCell sorting={true} column={column} title="Id" />
      ),
      cell: ({ row: { original: { id } } }) => (
        <StandardRowCell value={id} highlight={true} />
      ),
      // sortingFn: positionSortingFn,
    },
    // * Key 1
    {
      accessorKey: "key1",
      header: ({ column }) => (
        <StandardHeaderCell sorting={true} column={column} title="Key 1" />
      ),
      cell: ({ row: { original: { key1 } } }) => (
        <StandardRowCell value={key1} highlight={true} />
      ),
    },
    // * Key 2
    {
      accessorKey: "key2",
      header: ({ column }) => (
        <StandardHeaderCell sorting={true} column={column} title="Key 2" />
      ),
      cell: ({ row: { original: { key2 } } }) => (
        <StandardRowCell value={key2} highlight={true} />
      ),
      // sortingFn: urlSortingFn,
    },
    // * Customer Id
    {
      accessorKey: "customerId",
      header: ({ column }) => (
        <StandardHeaderCell sorting={true} column={column} title="Customer Id" />
      ),
      cell: ({ row: { original: { customerId } } }) => (
        <StandardRowCell value={customerId} highlight={true} />
      ),
      // sortingFn: urlSortingFn,
    },
  ];

