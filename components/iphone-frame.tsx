"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function IPhoneFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="relative">
      {/* outer bezel */}
      <div
        className={cn(
          "iphone-bezel relative h-[844px] w-[400px] rounded-[58px] p-[10px]",
          className
        )}
      >
        {/* power button hint */}
        <div className="absolute right-[-3px] top-[180px] h-[90px] w-[3px] rounded-r-md bg-[#1a1a1a]" />
        {/* volume buttons */}
        <div className="absolute left-[-3px] top-[140px] h-[40px] w-[3px] rounded-l-md bg-[#1a1a1a]" />
        <div className="absolute left-[-3px] top-[195px] h-[64px] w-[3px] rounded-l-md bg-[#1a1a1a]" />
        <div className="absolute left-[-3px] top-[270px] h-[64px] w-[3px] rounded-l-md bg-[#1a1a1a]" />

        {/* inner screen */}
        <div className="relative h-full w-full overflow-hidden rounded-[48px] bg-[#0a0c0e]">
          {/* dynamic island */}
          <div className="pointer-events-none absolute left-1/2 top-2.5 z-40 h-[34px] w-[120px] -translate-x-1/2 rounded-full bg-black ring-1 ring-black/80" />
          {children}
        </div>
      </div>
    </div>
  );
}
