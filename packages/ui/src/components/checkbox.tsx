import { Check } from "lucide-react";
import * as React from "react";
import { cn } from "../lib/cn";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ className, ...props }, ref) => (
  <span className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center">
    <input
      type="checkbox"
      ref={ref}
      className="peer absolute inset-0 z-10 h-5 w-5 cursor-pointer opacity-0"
      {...props}
    />
    <span
      className={cn(
        "pointer-events-none absolute inset-0 rounded-md border-2 border-teal-300/60 bg-white transition-all duration-200 ease-out peer-checked:border-teal-600 peer-checked:bg-teal-600 peer-focus-visible:ring-2 peer-focus-visible:ring-teal-600 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-sand-50",
        className,
      )}
    />
    <Check className="pointer-events-none relative h-3.5 w-3.5 scale-0 text-white transition-transform duration-150 ease-out peer-checked:scale-100" />
  </span>
));
Checkbox.displayName = "Checkbox";
