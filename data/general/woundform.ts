import {
  FormInput,
  IForm,
  WoundLocations,
  WoundSeverities,
  WoundSizes,
  WoundSources,
  WoundStages,
  WoundStatuses,
  WoundTypes,
} from "../types";

export const WoundFormInput: FormInput[] = [
  {
    name: "woundType",
    label: "Wound Type",
    options: WoundTypes,
    value: "woundType",
    type: "Select",
    placeholder: "Select the type of wound that applies",
    span: 2,
    constraints: {
      required: true,
    },
  },

  {
    name: "woundLocation",
    label: "Wound Location",
    options: WoundLocations,
    value: "woundLocation",
    type: "Select",
    placeholder: "Select the location of the wound",
    span: 2,
    constraints: {
      required: true,
    },
  },
  {
    name: "woundSize",
    label: "Wound Size",
    options: WoundSizes,
    value: "woundSize",
    type: "Select",
    placeholder: "Select the location of the wound",
    span: 2,
    constraints: {
      required: true,
    },
  },
  {
    name: "woundStage",
    label: "Wound Stage",
    options: WoundStages,
    value: "woundStage",
    type: "Select",
    placeholder: "Select the location of the wound",
    span: 3,
  },
  {
    name: "woundStatus",
    label: "Wound Status",
    options: WoundStatuses,
    value: "woundStatus",
    type: "Select",
    placeholder: "Select the location of the wound",
    span: 3,
    constraints: {
      required: true,
    },
  },
  {
    name: "woundSeverity",
    label: "Wound Severity",
    options: WoundSeverities,
    value: "woundSeverity",
    type: "Select",
    placeholder: "Select the location of the wound",
    span: 3,
    constraints: {
      required: true,
    },
  },
  {
    name: "woundSource",
    label: "Wound Source",
    options: WoundSources,
    value: "woundSource",
    type: "Select",
    placeholder: "Select the location of the wound",
    span: 3,
    constraints: {
      required: true,
    },
  },
];
