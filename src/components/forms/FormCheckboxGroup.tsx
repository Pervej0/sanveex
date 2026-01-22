import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import type { FormCheckboxGroupProps } from "@/types/form.types";

const FormCheckboxGroup: React.FC<FormCheckboxGroupProps> = ({
  name,
  label,
  required,
  disabled,
  options,
  className,
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className={className}>
          <div className="mb-4">
            {label && (
              <FormLabel className="text-base">
                {label} {required && <span className="text-red-500">*</span>}
              </FormLabel>
            )}
          </div>
          <div className="grid gap-2">
            {options.map((option) => (
              <FormField
                key={option.value}
                control={control}
                name={name}
                render={({ field }) => {
                  return (
                    <FormItem
                      key={option.value}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(option.value)}
                          disabled={disabled || option.disabled}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([
                                  ...(field.value || []),
                                  option.value,
                                ])
                              : field.onChange(
                                  (field.value || []).filter(
                                    (value: string) => value !== option.value,
                                  ),
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal text-sm cursor-pointer">
                        {option.label}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormCheckboxGroup;
