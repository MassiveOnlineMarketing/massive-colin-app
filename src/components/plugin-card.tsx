'use client';

import { KeyOneSvg, KeyTwoSvg } from "@/assests";
import { inter } from "@/styles/styles";
import { Copy } from "lucide-react";
import { useToast } from "./toast/use-toast";


type KeyProps = {
  keyOne: string;
  keyTwo: string;
}

export const Key = ({ keyOne, keyTwo }: KeyProps) => {
  const {toast } = useToast() 

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key)
    toast({
      title: "Copied!",
      description: "Key copied to clipboard",
      variant: "success",
    })
  }
  return (
    <div className="mt-auto px-4 py-3 rounded-[12px] bg-[#262928] text-sm">

      <div className="inline-flex gap-2 items-center w-full">
        <KeyOneSvg className="w-5 h-5 inline-block" />
        <p className={`mt-1 ${inter.className}`}>{keyOne.length > 22 ? keyOne.substring(0, 22) + "..." : keyOne}</p>
        <Copy onClick={() => handleCopy(keyOne)} className="w-4 h-4 inline-block ml-auto cursor-pointer" />
      </div>
      <div className="mt-1 inline-flex gap-2 items-center w-full">
        <KeyTwoSvg className="w-5 h-5 inline-block" />
        <p className={`mt-1 ${inter.className}`}>{keyTwo}</p>
        <Copy onClick={() => handleCopy(keyTwo)} className="w-4 h-4 inline-block ml-auto cursor-pointer" />
      </div>
    </div>
  )
}