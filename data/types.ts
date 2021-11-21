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
  | "Image";

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
