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
        type: "OneLineText",
        placeholder: "PESEL (or passport number)",
        span: 3,
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
        name: "Illnesses",
        label: "illnesses",
        options: [
          {
            value: "Diabetes",
            label: "Diabetes",
          },
          {
            value: "Rheumatoid Arthritis",
            label: "Rheumatoid Arthritis",
          },
          {
            value: "Motor or Sensory Deficit",
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
        name: "Allergies",
        label: "allergies",
        value: "allergies",
        type: "MultiSelect_Creatable",
        placeholder: "Enter your allergies",
        span: 3,
        options: [
          {
            value: "Diabetes",
            label: "Diabetes",
          },
          {
            value: "Rheumatoid Arthritis",
            label: "Rheumatoid Arthritis",
          },
          {
            value: "Motor or Sensory Deficit",
            label: "Motor or Sensory Deficit",
          },
          {
            value: "Cancer",
            label: "Cancer",
          },
          {
            value: "Auto-immune Disease",
            label: "Auto-immune Disease",
          },
          {
            value: "Obesity",
            label: "Obestiy",
          },
          {
            value: "Smoker/Alcoholic/Addict",
            label: "Smoker/Alcoholic/Addict",
          },
        ],
      },
      {
        name: "Medication",
        label: "medication",
        value: "Medication",
        type: "MultiSelect_Creatable",
        placeholder:
          "Enter any medication you take regularly or have taken in the past 2 weeks",
        span: 3,
        options: [
          {
            value: "Diabetes",
            label: "Diabetes",
          },
          {
            value: "Rheumatoid Arthritis",
            label: "Rheumatoid Arthritis",
          },
          {
            value: "Motor or Sensory Deficit",
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
      },
      {
        name: "pregnancy",
        label: "Preganancy",
        options: [
          {
            value: true,
            label: "Yes",
          },
          {
            value: false,
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
            value: true,
            label: "Yes",
          },
          {
            value: false,
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
            value: true,
            label: "Yes",
          },
          {
            value: false,
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
            value: true,
            label: "Yes",
          },
          {
            value: false,
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
