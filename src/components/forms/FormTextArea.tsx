import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import type { FormTextAreaProps } from "@/types/form.types";

const FormTextArea: React.FC<FormTextAreaProps> = ({
  name,
  label,
  placeholder,
  required,
  disabled,
  rows = 4,
  className,
  maxLength,
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
            <Textarea
              placeholder={placeholder}
              className="resize-none"
              {...field}
              value={field.value ?? ""}
              id={name}
              disabled={disabled}
              rows={rows}
              maxLength={maxLength}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormTextArea;
