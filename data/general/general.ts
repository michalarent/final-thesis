import { IForm } from "../types";

export const GeneralFormInput: IForm[] = [
  {
    step: 0,
    description: "Fill out general information about yourself.",
    label: "General",
    inputs: [
      {
        name: "firstName",
        label: "First Name",
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
        label: "Last Name",
        value: "lastName",
        type: "OneLineText",
        placeholder: "Enter your last name",
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
    ],
  },

  {
    step: 1,
    label: "Diseases & Allergies",
    description: "Higlight what illnesses you had during your childhood.",
    inputs: [
      {
        name: "maritial_status",
        label: "Maritial Status",
        options: [
          {
            value: "single",
            label: "Single",
          },
          {
            value: "Married",
            label: "Married",
          },
          {
            value: "Divorced",
            label: "Divorced",
          },
          {
            value: "Widowed",
            label: "Widowed",
          },
        ],
        value: "Maritial Status",
        type: "Select",
        placeholder: "Maritial Status",
        constraints: {
          required: true,
        },
        span: 3,
      },
      {
        name: "childhood_diseases",
        label: "Childhood Diseases",
        options: [
          {
            value: "measles",
            label: "Measles",
          },
          {
            value: "chickenpox",
            label: "Chickenpox",
          },
          {
            value: "mumps",
            label: "Mumps",
          },
          {
            value: "rubella",
            label: "Rubella",
          },
          {
            value: "rheumatic_fever",
            label: "Rheumatic Fever",
          },
          {
            value: "polio",
            label: "Polio",
          },
        ],
        value: "Childhood Diseases",
        type: "MultiSelect_Creatable",
        placeholder: "Childhood Diseases",
        span: 3,
      },
      {
        name: "allergies",
        label: "Allergies",
        value: "Allergies",
        type: "MultiSelect_Creatable",
        placeholder: "Allergies",
        options: [
          {
            value: "penicillin",
            label: "Penicillin",
          },
        ],
        span: 3,
      },
      {
        name: "medications",
        label: "Medications",
        value: "Medications",
        type: "MultiSelect_Creatable",
        placeholder: "Medications",
        options: [
          {
            value: "penicillin",
            label: "Penicillin",
          },
          {
            value: "antibiotics",
            label: "Antibiotics",
          },
        ],
        span: 3,
      },
    ],
  },
  {
    step: 2,
    label: "Diseases & Allergies",
    description: "Higlight what illnesses you had during your childhood.",
    inputs: [
      {
        name: "maritial_status",
        label: "Maritial Status",
        options: [
          {
            value: "single",
            label: "Single",
          },
          {
            value: "Married",
            label: "Married",
          },
          {
            value: "Divorced",
            label: "Divorced",
          },
          {
            value: "Widowed",
            label: "Widowed",
          },
        ],
        value: "Maritial Status",
        type: "Select",
        placeholder: "Maritial Status",
        constraints: {
          required: true,
        },
        span: 3,
      },
      {
        name: "childhood_diseases",
        label: "Childhood Diseases",
        options: [
          {
            value: "measles",
            label: "Measles",
          },
          {
            value: "chickenpox",
            label: "Chickenpox",
          },
          {
            value: "mumps",
            label: "Mumps",
          },
          {
            value: "rubella",
            label: "Rubella",
          },
          {
            value: "rheumatic_fever",
            label: "Rheumatic Fever",
          },
          {
            value: "polio",
            label: "Polio",
          },
        ],
        value: "Childhood Diseases",
        type: "MultiSelect_Creatable",
        placeholder: "Childhood Diseases",
        span: 3,
      },
      {
        name: "allergies",
        label: "Allergies",
        value: "Allergies",
        type: "MultiSelect_Creatable",
        placeholder: "Allergies",
        options: [
          {
            value: "penicillin",
            label: "Penicillin",
          },
        ],
        span: 3,
      },
      {
        name: "medications",
        label: "Medications",
        value: "Medications",
        type: "MultiSelect_Creatable",
        placeholder: "Medications",
        options: [
          {
            value: "penicillin",
            label: "Penicillin",
          },
          {
            value: "antibiotics",
            label: "Antibiotics",
          },
        ],
        span: 3,
      },
    ],
  },
];
