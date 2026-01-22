import React from "react";
import {
  useForm,
  UseFormReturn,
  FieldValues,
  SubmitHandler,
  DefaultValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";
import { Form as ShadcnForm } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

export interface FormProps<TFieldValues extends FieldValues = FieldValues> {
  schema?: ZodSchema<TFieldValues>;
  defaultValues?: DefaultValues<TFieldValues>;
  onSubmit: (data: TFieldValues) => void;
  children: React.ReactNode;
  className?: string;
  form?: UseFormReturn<TFieldValues>;

  // Visual options
  showSubmitButton?: boolean;
  showResetButton?: boolean;
  submitButtonText?: string;
  resetButtonText?: string;
  submitButtonProps?: React.ComponentProps<typeof Button>;
  resetButtonProps?: React.ComponentProps<typeof Button>;

  // Layout (kept for partial compatibility, though implemented via CSS)
  layout?: "vertical" | "horizontal" | "inline";
  isSubmitting?: boolean;
}

export function Form<TFieldValues extends FieldValues = FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  children,
  className,
  form: externalForm,
  showSubmitButton = true,
  showResetButton = false,
  submitButtonText = "Submit",
  resetButtonText = "Reset",
  submitButtonProps,
  resetButtonProps,
  layout = "vertical",
  isSubmitting = false,
}: FormProps<TFieldValues>) {
  // Initialize form if not provided externally

  const internalForm = useForm<TFieldValues>({
    resolver: schema ? zodResolver(schema as any) : undefined,
    defaultValues,
  });

  const form = externalForm || internalForm;

  const handleSubmit: SubmitHandler<TFieldValues> = (data) => {
    onSubmit(data);
  };

  return (
    <ShadcnForm {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn("space-y-6", className)}
      >
        {children}

        {(showSubmitButton || showResetButton) && (
          <div className="flex items-center gap-4 pt-4">
            {showResetButton && (
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                {...resetButtonProps}
              >
                {resetButtonText}
              </Button>
            )}
            {showSubmitButton && (
              <Button
                disabled={isSubmitting}
                size="lg"
                type="submit"
                {...submitButtonProps}
              >
                {isSubmitting ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  submitButtonText
                )}
              </Button>
            )}
          </div>
        )}
      </form>
    </ShadcnForm>
  );
}

export { useForm, useFormContext } from "react-hook-form";
export type { UseFormReturn } from "react-hook-form";
export default Form;
