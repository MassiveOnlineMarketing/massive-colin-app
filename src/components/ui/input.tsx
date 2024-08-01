import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon: React.ElementType;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, Icon, ...props }, ref) => {
    return (
      <div className="relative mt-3 rounded-full border border-neutral-200 bg-transparent text-white shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <Icon className="h-6 w-6 text-gray-300" aria-hidden="true" />
        </div>
        <input
          ref={ref}
          className={cn(
            "block w-full rounded-full px-4 py-3 pl-[50px] ",
            "flex w-full h-full bg-transparent file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400",

            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = "Input"



export { Input }