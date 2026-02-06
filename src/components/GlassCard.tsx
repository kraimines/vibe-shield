import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  glow?: "cyan" | "pink" | "purple";
}

export function GlassCard({ children, className, glow }: Props) {
  return (
    <div
      className={cn(
        "glass rounded-xl p-5",
        glow === "cyan" && "glow-cyan",
        glow === "pink" && "glow-pink",
        glow === "purple" && "glow-purple",
        className
      )}
    >
      {children}
    </div>
  );
}
