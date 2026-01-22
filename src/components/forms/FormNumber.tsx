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
import type { FormNumberProps } from "@/types/form.types";

const FormNumber: React.FC<FormNumberProps> = ({
  name,
  label,
  placeholder,
  required,
  disabled,
  min,
  max,
  step,
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
          <FormControl>
            <Input
              {...field}
              type="number"
              placeholder={placeholder}
              disabled={disabled}
              min={min}
              max={max}
              step={step}
              onChange={(e) => field.onChange(e.target.valueAsNumber)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default FormNumber;
