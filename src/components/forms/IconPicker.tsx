"use client";

import React, { useState, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import * as LucideIcons from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_LIST = [
  "Stethoscope",
  "HeartPulse",
  "Activity",
  "Pill",
  "Syringe",
  "Hospital",
  "Baby",
  "Thermometer",
  "ShieldCheck",
  "Microscope",
  "FlaskConical",
  "Dna",
  "Heart",
  "Zap",
  "Users",
  "BriefcaseMedical",
  "Ear",
  "Eye",
  "Brain",
  "Bone",
  "Lungs",
  "Droplets",
  "Bandage",
  "FirstAid",
  "CheckCircle",
  "Sparkles",
  "Star",
  "Plus",
  "Info",
  "AlertCircle",
  "HelpCircle",
  "Award",
  "Target",
  "Trophy",
  "Flag",
  "Shield",
  "Lock",
  "Unlock",
  "Eye",
  "EyeOff",
  "Trash2",
  "Edit",
  "Save",
  "Download",
  "Upload",
  // Communication & Logistics
  "Globe",
  "MapPin",
  "Phone",
  "Mail",
  "MessageSquare",
  "Send",
  "Share2",
  "Clock",
  "Calendar",
  "Building2",
  "Home",
  "Truck",
  "Package",
  // Creative & Tools
  "Pen",
  "PenTool",
  "PaintBucket",
  "Ruler",
  "Palette",
  "Lightbulb",
  "MousePointer2",
  "Maximize2",
  "Minimize2",
  "Layers",

  "Code",
  "Terminal",
  "Cpu",
  "HardDrive",
  "Database",
  "Server",
  "Cloud",
  "Wifi",
  "Bluetooth",
  "Battery",
  "Plug",
  "Settings",
  "Sliders",
  "Tool",

  "Wrench",
  "Hammer",
  "Screwdriver",
  "Cog",
  "Cogs",
  "Filter",
  "Funnel",
  "Search",
  "ZoomIn",
  "ZoomOut",
  "BarChart",
  "PieChart",
  "LineChart",
  "TrendingUp",
  "TrendingDown",
  "DollarSign",
  "CreditCard",
  "Wallet",
  "ShoppingCart",
  "Tag",
  "Tags",
  "Gift",
  "Camera",
  "Video",
  "Music",
  "Headphones",
  "Speaker",
  "Volume",
  "Bell",
  "CalendarCheck",
  "CalendarMinus",
  "CalendarPlus",

  "User",
  "Users",
  "UserPlus",
  "UserMinus",
  "UserCheck",
  "UserX",

  "ShieldOff",
  "ShieldCheck",
  "ShieldAlert",
  "HeartHandshake",
  "Handshake",

  "Heart",
  "HeartOff",
  "HeartPulse",

  "Star",
  "StarHalf",
  "StarOff",
  "Award",
  "Trophy",
  "Medal",
  "Crown",
  "Zap",
  "Sun",
  "Moon",
  "CloudRain",
  "CloudSnow",
  "Wind",
  "Umbrella",
  "Droplet",

  "Flame",
  "Fire",
  "Thermometer",
  "Battery",
  "BatteryCharging",
  "Cpu",
  "HardDrive",
  "Database",
  "Server",
  "Cloud",
  "Wifi",
  "Bluetooth",

  "Music",
  "Headphones",
  "Volume",
  "Volume1",
  "Volume2",
  "VolumeX",

  "Camera",
  "Video",
  "Film",
  "Image",
  "Images",
  "PictureInPicture",
  "CameraOff",
  "Mic",
  "MicOff",

  "Book",
  "Bookmark",
  "BookOpen",
  "File",
  "FileText",
  "FilePlus",
  "FileMinus",
  "FileX",
  "Folder",
  "FolderPlus",
  "FolderMinus",
  "FolderOpen",
  "Paperclip",
  "Link",

  "Coffee",
  "CupSoda",
  "IceCream",
  "Pizza",
  "Apple",
  "Leaf",
  "Flower",

  "Mountain",
  "Globe",
  "MapPin",
  "Compass",
];

interface IconPickerProps {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
  placeholder?: string;
  allowClear?: boolean;
}

export default function IconPicker({
  name,
  label,
  description,
  required,
  placeholder = "Select an icon",
  allowClear = true,
}: IconPickerProps) {
  const { control, setValue, watch } = useFormContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const selectedIconName = watch(name);

  const filteredIcons = useMemo(() => {
    return ICON_LIST.filter((icon) =>
      icon.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  const renderIcon = (iconName: string, className?: string) => {
    // @ts-expect-error - Dynamic lucide icon access
    const IconComponent = LucideIcons[iconName];
    if (!IconComponent) return null;
    return <IconComponent className={cn("w-4 h-4", className)} />;
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {label && (
            <FormLabel>
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}

          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "justify-between font-normal h-11 px-3",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  <div className="flex items-center gap-2 truncate">
                    {field.value ? (
                      <>
                        <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center shrink-0">
                          {renderIcon(field.value, "w-4 h-4 text-primary")}
                        </div>
                        <span className="truncate">{field.value}</span>
                      </>
                    ) : (
                      <span>{placeholder}</span>
                    )}
                  </div>
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className="w-[var(--radix-popover-trigger-width)] p-0"
              align="start"
            >
              <div className="p-3 border-b flex items-center gap-2">
                <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                <Input
                  placeholder="Search icons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-8 border-none focus-visible:ring-0 px-0"
                />
                {allowClear && field.value && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => {
                      field.onChange("");
                      setIsOpen(false);
                    }}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                )}
              </div>
              <ScrollArea className="h-64 p-2">
                <div className="grid grid-cols-4 gap-1">
                  {allowClear && (
                    <button
                      type="button"
                      className={cn(
                        "flex flex-col items-center justify-center p-2 rounded-md transition-colors hover:bg-muted text-[10px]",
                        !field.value &&
                          "bg-primary/10 text-primary ring-1 ring-primary/20",
                      )}
                      onClick={() => {
                        field.onChange("");
                        setIsOpen(false);
                      }}
                    >
                      <div className="w-8 h-8 flex items-center justify-center mb-1 border-2 border-dashed rounded-md">
                        <X className="w-4 h-4 opacity-40" />
                      </div>
                      <span className="truncate w-full text-center">None</span>
                    </button>
                  )}
                  {filteredIcons.map((iconName, index) => (
                    <button
                      key={`icon-picker-${iconName}-${field.value}-${index}`}
                      type="button"
                      className={cn(
                        "flex flex-col items-center justify-center p-2 rounded-md transition-colors hover:bg-muted text-[10px] group border",
                        field.value === iconName &&
                          "bg-primary/10 text-primary ring-1 ring-primary/20",
                      )}
                      onClick={() => {
                        field.onChange(iconName);
                        setIsOpen(false);
                      }}
                    >
                      <div
                        className={cn(
                          "w-8 h-8 flex items-center justify-center mb-1 rounded-md transition-colors",
                          field.value === iconName
                            ? "bg-primary/20"
                            : "bg-muted group-hover:bg-primary/10",
                        )}
                      >
                        {renderIcon(
                          iconName,
                          field.value === iconName
                            ? "text-primary"
                            : "text-muted-foreground group-hover:text-primary",
                        )}
                      </div>
                      <span className="truncate w-full text-center">
                        {iconName}
                      </span>
                    </button>
                  ))}
                  {filteredIcons.length === 0 && (
                    <div className="col-span-4 py-6 text-center text-xs text-muted-foreground">
                      No icons found.
                    </div>
                  )}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>

          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
