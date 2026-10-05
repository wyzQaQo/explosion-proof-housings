import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "spec" | "cert" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded border px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider",
        {
          "border-amber-500/20 bg-amber-500/10 text-amber-500": variant === "default",
          "border-amber-500/20 bg-amber-500/5 text-amber-500": variant === "spec",
          "border-emerald-500/20 bg-emerald-500/5 text-emerald-400": variant === "cert",
          "border-white/[0.06] text-zinc-400": variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
