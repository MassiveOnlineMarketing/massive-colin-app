import { cn } from "@/lib/utils";

import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/20/solid";
// import { format, parseISO, isValid } from 'date-fns';

interface ColumnRowCellProps {
  value: string | number | null | undefined;
  highlight?: boolean
}

const StandardRowCell: React.FC<ColumnRowCellProps> = ({ value, highlight }) => {
  return (
    <p className={cn(
      "text-sm leading-5 font-medium",
      highlight ? 'text-gray-800' : 'text-gray-500'
    )}>
      {value}
    </p>
  );
}


interface TrendingIndicatorProps {
  value: number | null;
}

const TrendingIndicatorRowCell: React.FC<TrendingIndicatorProps> = ({ value }) => {
  let colorClass = "";
  let icon = null;

  if (value) {
    if (value > 0) {
      colorClass = "";
      icon = <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />;
    } else if (value < 0) {
      colorClass = "";
      icon = <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" />;
    }
  }

  return (
    <div className="flex gap-[2px] items-center">
      <span className={cn(
        'text-sm leading-5 font-medium text-gray-500',
        colorClass
      )}>{value}</span>
      {icon}
    </div>
  );
}


// interface DateRowCellProps {
//   value: Date | string;
// }
// const DateRowCell: React.FC<DateRowCellProps> = ({ value }) => {
//   if (value && isValid(value)) {
//     const date = value instanceof Date ? value : parseISO(value.toString());
//     if (isValid(date)) {
//       return (
//         <p className="text-sm leading-5 font-medium text-gray-500">
//           {format(date, "MM/dd/yyyy")}
//         </p>
//       );
//     }
//   }

//   return (
//     <p className="text-sm leading-5 font-medium text-gray-500">
//       Not yet Checked
//     </p>
//   );
// };

// export default DateRowCell;



export { StandardRowCell, TrendingIndicatorRowCell  }

