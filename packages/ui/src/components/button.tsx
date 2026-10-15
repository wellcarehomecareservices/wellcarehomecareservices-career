import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 focus-visible:ring-offset-sand-50 disabled:pointer-events-none disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:scale-100 disabled:hover:shadow-none active:scale-[0.97]",
  {
    variants: {
      variant: {
        primary:
          "bg-teal-600 text-white shadow-[0_2px_8px_rgb(18_57_58_/_0.2)] hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-teal-900 hover:shadow-[0_14px_32px_-10px_rgb(18_57_58_/_0.6)]",
        secondary:
          "border-2 border-teal-600 text-teal-900 hover:-translate-y-0.5 hover:scale-[1.03] hover:border-teal-900 hover:bg-teal-900 hover:text-white hover:shadow-[0_14px_32px_-10px_rgb(18_57_58_/_0.4)]",
        accent:
          "bg-amber-500 text-teal-900 shadow-[0_2px_8px_rgb(18_57_58_/_0.2)] hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-[#c4923a] hover:shadow-[0_14px_32px_-10px_rgb(217_164_65_/_0.7)]",
        ghost: "text-teal-900 hover:bg-teal-50 hover:text-teal-600",
      },
      size: {
        default: "h-12 px-7 text-sm",
        sm: "h-9 px-4 text-sm",
        lg: "h-16 px-10 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";
