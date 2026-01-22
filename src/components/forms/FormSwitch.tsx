import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import type { FormSwitchProps } from "@/types/form.types";

const FormSwitch: React.FC<FormSwitchProps> = ({
  name,
  label,
  disabled,
  className,
  required,
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={`flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm ${className}`}
        >
          <div className="space-y-0.5">
            {label && (
              <FormLabel className="text-base">
                {label} {required && <span className="text-red-500">*</span>}
              </FormLabel>
            )}
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSwitch;
