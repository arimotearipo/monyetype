import { cn } from "@/lib/utils"
import React from "react"

type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export function Card({ children, className, ...props }: DivProps) {
  return (
    <div
      className={cn(
        "bg-white/40 backdrop-blur-xs p-6 rounded-sm shadow-lg w-full mx-auto border border-white/40",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
