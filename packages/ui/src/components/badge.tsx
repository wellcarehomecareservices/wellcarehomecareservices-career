import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-mono text-xs uppercase tracking-label-wide",
  {
    variants: {
      variant: {
        default: "bg-teal-50 text-teal-900 px-3 py-1",
        outline: "border border-teal-300 text-teal-900 px-3 py-1",
        accent: "bg-amber-500/15 text-amber-500 px-3 py-1",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}
