import { z } from "zod";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";

export interface BaseFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  className?: string;
  children: React.ReactNode;
}

export interface FormInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FormSelectOption {
  value: string;
  label: string;
}

export interface FormSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  options: FormSelectOption[];
  disabled?: boolean;
  required?: boolean;
  className?: string;
  mode?: "multiple" | "tags";
  showSearch?: boolean;
  allowClear?: boolean;
  loading?: boolean;
  // Antd leftovers kept for type compatibility
  size?: any;
  variant?: any;
  filterOption?: any;
  maxTagCount?: number;
  notFoundContent?: React.ReactNode;
  optionFilterProp?: string;
  searchValue?: string;
  suffixIcon?: React.ReactNode;
  autoClearSearchValue?: boolean;
  dropdownStyle?: React.CSSProperties;
  popupMatchSelectWidth?: boolean;
  virtual?: boolean;
}

export interface FormCheckboxGroupProps {
  name: string;
  label?: string;
  options: { label: string; value: string; disabled?: boolean }[];
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface FormRadioProps {
  name: string;
  label?: string;
  options: { label: string; value: string; disabled?: boolean }[];
  required?: boolean;
  disabled?: boolean;
  className?: string;
  // Antd leftovers
  buttonStyle?: "outline" | "solid";
  optionType?: "default" | "button";
  size?: any;
}

export interface FormSwitchProps {
  name: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
  loading?: boolean;
  checkedValue?: any;
  unCheckedValue?: any;
  size?: any;
}

export interface FormTextAreaProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
  showCount?: boolean;
  allowClear?: boolean;
  className?: string;
  autoSize?: boolean | object;
  size?: any;
  variant?: any;
}

export interface FormSliderProps {
  name: string;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  range?: boolean;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  marks?: Record<number, React.ReactNode>;
}

export interface FormDatePickerProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  format?: string;
  showTime?: boolean;
  picker?: "date" | "week" | "month" | "quarter" | "year";
  minDate?: Date;
  maxDate?: Date;
  allowClear?: boolean;
  // Antd leftovers
  size?: any;
  variant?: any;
  showNow?: boolean;
  showToday?: boolean;
  disabledDate?: (current: Date) => boolean;
  presets?: { label: React.ReactNode; value: Date }[];
  suffixIcon?: React.ReactNode;
}

export interface FormNumberProps {
  name: string;
  label?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface FormColorPickerProps {
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface FormTreeSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  treeData?: any[]; // Keep flexible
  multiple?: boolean;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface FormRateProps {
  name: string;
  label?: string;
  count?: number;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface FormUploadProps {
  name: string;
  label?: string;
  accept?: string;
  multiple?: boolean;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}
