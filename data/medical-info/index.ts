import {
  Allergies,
  BloodTypes,
  FormInput,
  IForm,
  Medications,
  YesOrNo,
} from "../types";

export const MedicalHistoryForm: FormInput[] = [
  {
    name: "firstName",
    label: "First Name",
    value: "firstName",
    type: "OneLineText",
    placeholder: "Enter your first name",
    span: 2,
    constraints: {
      required: true,
      minLength: 2,
    },
  },
  {
    name: "lastName",
    label: "Last Name",
    value: "lastName",
    type: "OneLineText",
    placeholder: "Enter your last name",
    span: 2,
    constraints: {
      required: true,
      minLength: 2,
    },
  },
  {
    name: "birthDate",
    label: "Birth Date",
    value: "birthDate",
    type: "DatePicker",
    placeholder: "Birth Date",
    span: 2,
    constraints: {
      required: true,
    },
  },
  {
    name: "country",
    label: "Country",
    value: "country",
    type: "Country",
    placeholder: "Country of citizenship",
    span: 3,
    constraints: {
      required: true,
    },
  },
  //   {
  //     name: "pesel",
  //     label: "Pesel",
  //     value: "pesel",
  //     type: "OneLineText",
  //     placeholder: "PESEL (or passport number)",
  //     span: 3,
  //     constraints: {
  //       required: true,
  //       maxLength: 11,
  //       minLength: 11,
  //     },
  //   },
  {
    name: "gender",
    label: "Gender",
    options: [
      {
        value: "male",
        label: "Male",
      },
      {
        value: "female",
        label: "Female",
      },
      {
        value: "other",
        label: "Other",
      },
    ],
    value: "gender",
    default: "male",
    type: "Radio",
    placeholder: "Gender",
    span: 3,
  },

  {
    name: "allergies",
    label: "What allergies do you have?",
    value: "allergies",
    type: "MultiSelect_Creatable",
    placeholder: "Enter your allergies",
    span: 2,
    options: Allergies,
  },
  {
    name: "Medication",
    label: "What medications do you take?",
    value: "Medication",
    type: "MultiSelect_Creatable",
    placeholder:
      "Enter any medication you take regularly or have taken in the past 2 weeks",
    span: 2,
    options: Medications,
  },
  {
    name: "BloodType",
    label: "What blood type do you have?",
    value: "BloodType",
    type: "MultiSelect_Creatable",
    placeholder:
      "Enter any medication you take regularly or have taken in the past 2 weeks",
    span: 2,
    options: BloodTypes,
  },
  {
    name: "isSmoker",
    label: "Smoker?",
    options: YesOrNo,
    value: "isSmoker",
    type: "Radio",
    default: "False",
    placeholder: "Are you a smoker?",
    span: 2,
  },
  {
    name: "isAlcoholic",
    label: "Alcoholic?",
    options: YesOrNo,
    value: "isAlcoholic",
    type: "Radio",
    default: "False",
    placeholder: "Are you alcoholic?",
    span: 2,
  },
  {
    name: "isDiabetic",
    label: "Diabetic?",
    options: YesOrNo,
    default: "False",
    value: "isDiabetic",
    type: "Radio",
    placeholder: "Are you diabetic?",
    span: 2,
  },
];
