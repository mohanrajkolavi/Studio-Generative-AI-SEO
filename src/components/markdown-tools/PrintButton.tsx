"use client";

import { useCallback } from "react";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PrintButtonProps {
  className?: string;
  label?: string;
}

/** Opens the browser print dialog, where users can print or "Save as PDF". */
export function PrintButton({ className, label = "Print / Save as PDF" }: PrintButtonProps) {
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handlePrint}
      className={cn("gap-1.5", className)}
    >
      <Printer className="h-3.5 w-3.5" />
      <span>{label}</span>
    </Button>
  );
}
