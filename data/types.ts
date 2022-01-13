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
  | "ScheduleTime"
  | "DatePicker";

export type FormInput = {
  name: string;
  label: string;
  value: string;
  type: InputType;
  placeholder: string[] | string;
  span?: number;
  required?: boolean;
  default?: any;
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

export type Allergy = "Foods" | "Animals" | "Pollen" | "Chemicals" | "Other";
export type BloodType = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
export type Medication = "Insulin" | "Aspirin" | "Ibuprofen" | "Other";
export type WoundType = "Fracture" | "Laceration" | "Infection" | "Other";
export type WoundLocation =
  | "Head"
  | "Neck"
  | "Chest"
  | "Abdomen"
  | "Upper Arm"
  | "Lower Arm"
  | "Hand"
  | "Upper Leg"
  | "Lower Leg"
  | "Foot"
  | "Other";
export type WoundSize = "Small" | "Medium" | "Large" | "Other";
export type WoundStage = "Early" | "Mid" | "Late" | "Other";
export type WoundStatus = "Open" | "Closed" | "Other";
export type WoundSeverity = "Mild" | "Moderate" | "Severe" | "Other";
export type WoundSource = "Infection" | "Burn" | "Other";

export const Allergies = [
  {
    value: "Foods",
    label: "Foods",
  },
  {
    value: "Animals",
    label: "Animals",
  },
  {
    value: "Pollen",
    label: "Pollen",
  },
  {
    value: "Chemicals",
    label: "Chemicals",
  },
  {
    value: "Other",
    label: "Other",
  },
];

export const Medications = [
  {
    value: "Insulin",
    label: "Insulin",
  },
  {
    value: "Aspirin",
    label: "Aspirin",
  },
  {
    value: "Ibuprofen",
    label: "Ibuprofen",
  },
  {
    value: "Other",
    label: "Other",
  },
];

export const BloodTypes = [
  {
    value: "A+",
    label: "A+",
  },
  {
    value: "A-",
    label: "A-",
  },
  {
    value: "B+",
    label: "B+",
  },
  {
    value: "B-",
    label: "B-",
  },
  {
    value: "AB+",
    label: "AB+",
  },
  {
    value: "AB-",
    label: "AB-",
  },
  {
    value: "O+",
    label: "O+",
  },
  {
    value: "O-",
    label: "O-",
  },
];

export const YesOrNo = [
  {
    value: "True",
    label: "Yes",
  },
  {
    value: "False",
    label: "No",
  },
];

export const WoundTypes = [
  { value: "Fracture", label: "Fracture" },
  { value: "Laceration", label: "Laceration" },
  { value: "Infection", label: "Infection" },
  { value: "Other", label: "Other" },
];

export const WoundLocations = [
  { value: "Head", label: "Head" },
  { value: "Neck", label: "Neck" },
  { value: "Chest", label: "Chest" },
  { value: "Abdomen", label: "Abdomen" },
  { value: "Upper Arm", label: "Upper Arm" },
  { value: "Lower Arm", label: "Lower Arm" },
  { value: "Hand", label: "Hand" },
  { value: "Upper Leg", label: "Upper Leg" },
  { value: "Lower Leg", label: "Lower Leg" },
  { value: "Foot", label: "Foot" },
  { value: "Other", label: "Other" },
];

export const WoundSizes = [
  { value: "Small", label: "Small" },
  { value: "Medium", label: "Medium" },
  { value: "Large", label: "Large" },
  { value: "Other", label: "Other" },
];

export const WoundStages = [
  { value: "Early", label: "Early" },
  { value: "Mid", label: "Mid" },
  { value: "Late", label: "Late" },
  { value: "Other", label: "Other" },
];

export const WoundStatuses = [
  { value: "Open", label: "Open" },
  { value: "Closed", label: "Closed" },
  { value: "Other", label: "Other" },
];

export const WoundSeverities = [
  { value: "Mild", label: "Mild" },
  { value: "Moderate", label: "Moderate" },
  { value: "Severe", label: "Severe" },
  { value: "Other", label: "Other" },
];

export const WoundSources = [
  { value: "Infection", label: "Infection" },
  { value: "Burn", label: "Burn" },
  { value: "Other", label: "Other" },
];
