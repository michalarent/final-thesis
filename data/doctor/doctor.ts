import { FormInput, IForm } from "../types";

export const CreateUpdateDoctor: FormInput[] = [
  {
    name: "firstName",
    label: "Offical First Name",
    value: "firstName",
    type: "OneLineText",
    placeholder: "Enter your first name",
    span: 3,
    constraints: {
      required: true,
      minLength: 2,
    },
  },
  {
    name: "lastName",
    label: "Offical Last Name",
    value: "lastName",
    type: "OneLineText",
    placeholder: "Enter your first name",
    span: 3,
    constraints: {
      required: true,
      minLength: 2,
    },
  },
  {
    name: "year",
    label: "Year",
    value: "yearOfBirth",
    type: "Date",
    placeholder: "Year",
    span: 2,
    constraints: {
      required: true,
    },
  },
  {
    name: "month",
    label: "Month",
    value: "monthOfBirth",
    type: "Date",
    placeholder: "Month",
    span: 2,
    constraints: {
      required: true,
    },
  },
  {
    name: "day",
    label: "Day",
    value: "dayOfBirth",
    type: "Date",
    placeholder: "Day",
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
  {
    name: "pesel",
    label: "Pesel",
    value: "pesel",
    type: "OneLineText",
    placeholder: "PESEL (or passport number)",
    span: 3,
    constraints: {
      required: true,
      minLength: 11,
      maxLength: 11,
      inputType: "number",
    },
  },
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
    value: "Gender",
    type: "Radio",
    placeholder: "Gender",
    span: 3,
  },
  {
    type: "Select",
    value: "specialization",
    placeholder: "",
    name: "specialization",
    label: "Specialization",
    constraints: {
      required: true,
    },
    options: [
      {
        value: "neurologist",
        label: "Neurologist",
      },
      {
        value: "hygienist",
        label: "Hygienist",
      },
      {
        value: "pediatrician",
        label: "Pediatrician",
      },
      {
        value: "dermatologist",
        label: "Dermatologist",
      },
    ],
  },
];
