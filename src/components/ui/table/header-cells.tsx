import { Column, Row, SortDirection } from "@tanstack/react-table";

import { cn } from "@/lib/utils";

import { SortDataTableIcon } from ".";

const SortingIndicator = (props: { sorting: false | SortDirection }) => {
  if (props.sorting === "asc") {
    return <SortDataTableIcon className="w-5 h-5 text-gray-600 ml-3" />
  } else if (props.sorting === "desc") {
    return <SortDataTableIcon className="w-5 h-5 text-gray-600 ml-3 rotate-180" />
  } else {
    return null;
  }
}

interface ColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>,
  title: string,
  sorting?: boolean,
  tooltip?: string
}

const StandardHeaderCell: React.FC<ColumnHeaderProps<any, any>> = ({ column, title, sorting }) => {
  const onClick = sorting ? () => column.toggleSorting(column.getIsSorted() === "asc") : undefined;

  return (
    <p
      className={cn(
        "flex items-center font-medium text-gray-600",
        sorting && "cursor-pointer",
      )}
      onClick={onClick}
    >
      {title}
      {sorting && <SortingIndicator sorting={column.getIsSorted()} />}
    </p>
  );
}

export { StandardHeaderCell }