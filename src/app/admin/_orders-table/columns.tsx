"use client";

import { ColumnDef } from "@tanstack/react-table";
import { StandardHeaderCell, StandardRowCell } from "@/components/ui/table";

import { Checkbox } from "@/components/ui/checkbox";
import { OrderDTO } from "@/data/order";
import { cn } from "@/lib/utils";
import { PRODUCTS } from "@/lib/product-constants";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { sendKeys } from "@/data/test";
import { useToast } from "@/components/toast/use-toast";

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
      return (
        keys.map((key) => {
          return (
            <div key={key.id} className="text-sm leading-5 font-medium text-gray-500">
              <p className="font-semibold">{PRODUCTS[key.productId].name}</p>
              <p>{key.key1}</p>
              <p className="mb-2">{key.key2}</p>
            </div>
          )
        })
      )
    }
    // sortingFn: positionSortingFn,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white" align="end">
            <DropdownMenuLabel>Copy</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(order.id)}
            >
              Order ID
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(order.customerId)}
            >
              Customer ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Email</DropdownMenuLabel>
            <OrderActionsDropdown orderId={order.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];


const OrderActionsDropdown = ({ orderId }: { orderId: string }) => {
  const { toast } = useToast()

  const handleSendKeys = async (orderId: string) => {
    const res = await sendKeys(orderId)
    console.log(res)
    if (res.success === true) {
      toast({
        title: res.message || "Keys sent successfully 🎉",
        variant: "success",
        duration: 5000,
      });
    } else {
      toast({
        title: res.message || "Error sending keys",
        variant: "destructive",
        duration: 5000,
      });
    }
  }


  return (
    <DropdownMenuItem
      onClick={() => handleSendKeys(orderId)}
    >
      Send Keys
    </DropdownMenuItem>
  );
};

export default OrderActionsDropdown;

