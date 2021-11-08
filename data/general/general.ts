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
        name: "pesel",
        label: "Pesel",
        value: "pesel",
        type: "Number",
        placeholder: "PESEL (or passport number)",
        span: 2,
        constraints: {
          required: true,
          maxLength: 11,
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
    label: "Medical history",
    description: "Please select the ones that apply:",
    inputs: [
      {
        name: "illnesses",
        label: "Illnesses:",
        options: [
          {
            value: "diabetes",
            label: "Diabetes",
          },
          {
            value: "rheumatoid_arthritis",
            label: "Rheumatoid Arthritis",
          },
          {
            value: "motor_or_sensory_deficit",
            label: "Motor or Sensory Deficit",
          },
          {
            value: "cancer",
            label: "Cancer",
          },
          {
            value: "auto_immune_disease",
            label: "Auto-immune disease",
          },
          {
            value: "obesity",
            label: "Obestiy",
          },
          {
            value: "smoker_alcoholic_addict",
            label: "Smoker/Alcholic/Addict",
          },
        ],
        value: "Illneses",
        type: "MultiSelect_Creatable",
        placeholder: "Illnesses",
        span: 3,
      },
      {
        name: "allergies",
        label: "Allergies",
        value: "Allergies",
        type: "MultiLineText",
        placeholder: "Enter your allergies",
        span: 3,
        constraints: {
          required: true,
          minLength: 100,
        },
      },
      {
        name: "medication",
        label: "Medication",
        value: "Medication",
        type: "MultiLineText",
        placeholder:
          "Enter any medication you take regularly or have taken in the past 2 weeks",
        span: 3,
        constraints: {
          required: true,
          minLength: 100,
        },
      },
      {
        name: "pregnancy",
        label: "Preganancy",
        options: [
          {
            value: "yes",
            label: "Yes",
          },
          {
            value: "no",
            label: "No",
          },
        ],
        value: "Pregnancy",
        type: "Radio",
        placeholder: "Are you currently pregnant",
        span: 3,
      },
      {
        name: "tobacco",
        label: "Tobacco",
        options: [
          {
            value: "yes",
            label: "Yes",
          },
          {
            value: "no",
            label: "No",
          },
        ],
        value: "Tobbacco",
        type: "Radio",
        placeholder: "Are you a smoker:",
        span: 3,
      },
      {
        name: "alcohol",
        label: "Alcohol",
        options: [
          {
            value: "yes",
            label: "Yes",
          },
          {
            value: "no",
            label: "No",
          },
        ],
        value: "Alcohol",
        type: "Radio",
        placeholder: "Do you consume alchol:",
        span: 3,
      },
      {
        name: "drugs",
        label: "Drugs",
        options: [
          {
            value: "yes",
            label: "Yes",
          },
          {
            value: "no",
            label: "No",
          },
        ],
        value: "Drugs",
        type: "Radio",
        placeholder: "Do you consume any recreational drugs:",
        span: 3,
      },
    ],
  },
];
