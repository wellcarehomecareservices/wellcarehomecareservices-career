import { Button, cn, type ButtonProps } from "@wellcare/ui";

const variantClasses = {
  primary: "bg-teal-700 text-white hover:bg-teal-800",
  secondary: "border border-teal-700 bg-white text-teal-900 hover:border-teal-700 hover:bg-teal-50 hover:text-teal-900",
  accent: "bg-amber-400 text-teal-900 hover:bg-amber-500",
  ghost: "text-teal-900 hover:bg-teal-50 hover:text-teal-800",
};

const sizeClasses = {
  default: "h-11 px-5 text-sm",
  sm: "h-9 px-3 text-sm",
  lg: "h-12 px-6 text-sm",
};

export function CareersButton({ variant = "primary", size = "default", className, ...props }: ButtonProps) {
  return (
    <Button
      {...props}
      variant={variant}
      size={size}
      className={cn(
        "rounded-md font-semibold shadow-none hover:translate-y-0 hover:scale-100 hover:shadow-none active:scale-100",
        variantClasses[variant ?? "primary"],
        sizeClasses[size ?? "default"],
        className,
      )}
    />
  );
}