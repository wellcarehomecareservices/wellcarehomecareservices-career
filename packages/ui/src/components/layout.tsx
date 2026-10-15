import * as React from "react";
import { cn } from "../lib/cn";

export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-6xl px-6", className)} {...props} />;
}

export function Section({
  className,
  tone = "sand",
  ...props
}: React.HTMLAttributes<HTMLElement> & { tone?: "sand" | "mist" | "harbor" }) {
  const toneClass = {
    sand: "bg-sand-50",
    mist: "bg-teal-50",
    harbor: "bg-teal-900 text-white",
  }[tone];

  return <section className={cn("py-16 md:py-24", toneClass, className)} {...props} />;
}
