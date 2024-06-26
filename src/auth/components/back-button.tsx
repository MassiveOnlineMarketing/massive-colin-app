"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

interface BackButtonProps {
  href: string;
  label: string;
};

export const BackButton = ({
  href,
  label,
}: BackButtonProps) => {
  return (
    <Button
      size="sm"
      variant="link"
      asChild
      className="px-0 font-normal text-gray-300 w-full"
    >
      <Link href={href}>
        {label}
      </Link>
    </Button>
  );
};