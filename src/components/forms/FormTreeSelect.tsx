import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FormTreeSelectProps } from "@/types/form.types";

const FormTreeSelect: React.FC<FormTreeSelectProps> = ({
  name,
  label,
  placeholder,
  required,
  disabled,
  treeData, // Assuming structure { title, value, children }
  className,
}) => {
  const { control } = useFormContext();

  // Helper to flatten basic tree data for Select compatibility
  // This is a simplification.

  const flattenOptions = (data: any[] = []): any[] => {
    return data.reduce((acc, node) => {
      acc.push({ label: node.title, value: node.value });
      if (node.children) {
        acc.push(...flattenOptions(node.children));
      }
      return acc;
    }, []);
  };

  const options = flattenOptions(treeData);

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
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormTreeSelect;
