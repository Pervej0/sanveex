import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { FormColorPickerProps } from "@/types/form.types";

const FormColorPicker: React.FC<FormColorPickerProps> = ({
  name,
  label,
  required,
  disabled,
  className,
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel>
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <div className="flex gap-2">
            <FormControl>
              <Input
                {...field}
                type="color"
                className="w-12 h-10 p-1 cursor-pointer"
                disabled={disabled}
              />
            </FormControl>
            <Input
              {...field}
              placeholder="#000000"
              disabled={disabled}
              maxLength={7}
            />
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormColorPicker;
