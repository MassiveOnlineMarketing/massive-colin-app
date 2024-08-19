"use client";

import { ColumnDef } from "@tanstack/react-table";
import { StandardHeaderCell, StandardRowCell } from "@/components/ui/table";

import { Checkbox } from "@/components/ui/checkbox";
import { OrderDTO } from "@/data/order";



export const columns = (): ColumnDef<OrderDTO>[] => [
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
    // * Order Number
    {
      accessorKey: "orderNumber",
      header: ({ column }) => (
        <StandardHeaderCell sorting={true} column={column} title="Order Number" />
      ),
      cell: ({ row: { original: { orderNumber } } }) => (
        <StandardRowCell value={orderNumber} highlight={true} />
      ),
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
    // * customer
    {
      accessorKey: "customer",
      header: ({ column }) => (
        <StandardHeaderCell sorting={true} column={column} title="Name" />
      ),
      cell: ({ row: { original: { customer } } }) => (
        <StandardRowCell value={customer.name} highlight={true} />
      ),
      // sortingFn: positionSortingFn,
    },
    // * Email
    {
      accessorKey: "email",
      header: ({ column }) => (
        <StandardHeaderCell sorting={true} column={column} title="Email" />
      ),
      cell: ({ row: { original: { customer } } }) => (
        <StandardRowCell value={customer.email} highlight={true} />
      ),
      // sortingFn: positionSortingFn,
    },
    // * Keys
    {
      accessorKey: "keys",
      header: ({ column }) => (
        <StandardHeaderCell sorting={true} column={column} title="Keys" />
      ),
      cell: ({ row: { original: { keys } } }) => {
        if (keys.length === 0) {
          return <StandardRowCell value="No keys" />;
        }
        return <StandardRowCell value={keys.length} />;
      }
      // sortingFn: positionSortingFn,
    },
  ];

