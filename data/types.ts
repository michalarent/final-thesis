export type InputType =
  | "OneLineText"
  | "MultiLineText"
  | "Number"
  | "Date"
  | "Checkbox"
  | "Select"
  | "Radio"
  | "Country"
  | "MultiSelect_Creatable"
  | "MultiImage"
  | "Image"
  | "ScheduleDay"
  | "ScheduleTime";

export type FormInput = {
  name: string;
  label: string;
  value: string;
  type: InputType;
  placeholder: string[] | string;
  span?: number;
  required?: boolean;
  options?: SelectOption[];
  constraints?: Record<string, any>;
  isS3?: boolean;
};

export interface IForm {
  step?: number;
  description?: string;
  label?: string;
  inputs: FormInput[];
}

export interface SelectOption {
  value: string | boolean;
  label: string;
}
