import { FormInput, IForm } from "../types";

export const CreateOrUpdateAppointment: FormInput[] = [
  {
    name: "urgent",
    label: "Is the visit urgent?",
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
    value: "Urgent",
    type: "Radio",
    placeholder: "Urgent",
    span: 2,
  },
  {
    name: "comment",
    label: "Additional Comments",

    value: "comment",
    type: "MultiLineText",
    placeholder: "Additional Comments",
    span: 4,
  },
  {
    name: "Images",
    label: "Upload Images",
    value: "images",
    type: "MultiImage",
    placeholder: "Upload Images",
    span: 6,
  },
];
