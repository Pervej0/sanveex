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
import type { FormUploadProps } from "@/types/form.types";

const FormUpload: React.FC<FormUploadProps> = ({
  name,
  label,
  required,
  accept,
  multiple = false,
  className,
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange, ...field } }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel>
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Input
              {...field}
              type="file"
              accept={accept}
              multiple={multiple}
              onChange={(e) => {
                const files = e.target.files;
                if (files) {
                  // Map to array of files for consistency or keep as FileList
                  // Existing code likely expects fileList structure of Antd but we can't easily reproduce it
                  // We'll return the FileList or Array
                  onChange(Array.from(files));
                }
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormUpload;
