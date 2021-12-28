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
    value: "urgent",
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
    isS3: true,
    span: 6,
  },
  {
    name: "appointmentDay",
    label: "Day",
    value: "appointmentDay",
    type: "ScheduleDay",
    placeholder: "Pick a Day",
    span: 6,
  },
  {
    name: "appointmentTime",
    label: "Time",
    value: "appointmentTime",
    type: "ScheduleTime",
    placeholder: "Pick a Time",
    span: 6,
  },
];
