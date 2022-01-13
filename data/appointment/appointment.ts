import { FormInput, IForm } from "../types";

export const CreateOrUpdateAppointment: FormInput[] = [
  {
    name: "Images",
    label: "Upload Images",
    value: "images",
    type: "MultiImage",
    placeholder: "Upload Images",
    isS3: true,
    span: 2,
  },
  {
    name: "appointmentDay",
    label: "Day",
    value: "appointmentDay",
    type: "ScheduleDay",
    placeholder: "Pick a Day",
    span: 2,
  },
  {
    name: "appointmentTime",
    label: "Time",
    value: "appointmentTime",
    type: "ScheduleTime",
    placeholder: "Pick a Time",
    span: 2,
  },
];
