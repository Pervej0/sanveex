import React from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface ToggleProps {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  children: React.ReactNode;
  size?: "sm" | "icon" | "lg";
  className?: string;
}

export function Toggle({
  pressed = false,
  onPressedChange,
  children,
  size = "icon",
  className,
}: ToggleProps) {
  return (
    <Button
      variant={pressed ? "default" : "ghost"}
      size={size}
      onClick={() => onPressedChange?.(!pressed)}
      className={cn(
        "data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
        pressed && "bg-accent text-accent-foreground",
        className,
      )}
      data-state={pressed ? "on" : "off"}
      type="button"
    >
      {children}
    </Button>
  );
}
