import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import type { FormSliderProps } from "@/types/form.types";

const FormSlider: React.FC<FormSliderProps> = ({
  name,
  label,
  required,
  disabled,
  min = 0,
  max = 100,
  step = 1,
  className,
  range,
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
            <Slider
              min={min}
              max={max}
              step={step}
              defaultValue={range ? field.value : [field.value]}
              value={range ? field.value : [field.value || min]}
              onValueChange={(vals) => {
                const newValue = range ? vals : vals[0];
                field.onChange(newValue);
              }}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSlider;
