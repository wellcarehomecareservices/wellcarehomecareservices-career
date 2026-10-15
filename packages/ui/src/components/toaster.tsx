"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      toastOptions={{
        classNames: {
          toast: "bg-white border border-teal-300/30 shadow-bloom-md rounded-xl",
          title: "text-teal-900 font-medium",
          description: "text-teal-900/70",
          actionButton: "bg-teal-600 text-white",
          cancelButton: "bg-teal-50 text-teal-900",
        },
      }}
    />
  );
}

export { toast } from "sonner";
