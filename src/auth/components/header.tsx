import { cn } from "@/lib/utils";
import { oswald } from "@/styles/styles";

interface HeaderProps {
  label: string;
};

export const Header = ({
  label,
}: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn(
        "text-3xl font-semibold",
        oswald.className
      )}>
        {label}
      </h1>
    </div>
  );
};