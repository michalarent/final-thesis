import { IForm } from "../types";

export const WoundFormInput: IForm[] = [
  {
    step: 0,
    description: "Fill out general information about your wound.",
    label: "General",
    inputs: [
      {
        name: "woundType",
        label: "Wound Type",
        options: [
          {
            value: "incised",
            label: "Incised – A clean, straight cut caused by a sharp edge",
          },
          {
            value: "laceration",
            label:
              "Laceration - A messy looking wound caused by a tearing or crushing force",
          },
          {
            value: "abrasion",
            label: "Abrasion - A wound caused by a scraping force or friction",
          },
          {
            value: "puncture",
            label: "Puncture - A deep wound caused by a sharp, stabbing object",
          },
          {
            value: "avulsion",
            label:
              "Avulsion - A wound caused by a tearing force in which tissue is torn away from its normal position",
          },
          {
            value: "amputation",
            label:
              "Amputation - The loss of a distinct body part such as a limb, finger, toe or ear",
          },
          {
            value: "surgical",
            label: "Surgical – A wound that results from a surgical procedure",
          },
        ],
        value: "woundType",
        type: "Select",
        placeholder: "Select the type of wound that applies",
        span: 3,
      },
      {
        name: "exudate",
        label: "Exudate",
        options: [
          {
            value: "none",
            label: "None",
          },
          {
            value: "low",
            label: "Low",
          },
          {
            value: "moderate",
            label: "Moderate",
          },
          {
            value: "hight",
            label: "High",
          },
        ],
        value: "exudate",
        type: "Select",
        placeholder: "Select the level of exudate that applies",
        span: 3,
      },
      {
        name: "woundColor",
        label: "Wound Color",
        options: [
          {
            value: "woundHealed",
            label: "Wound healed",
          },
          {
            value: "pink",
            label: "Pink",
          },
          {
            value: "red",
            label: "Red",
          },
          {
            value: "yellow",
            label: "Yellow",
          },
          {
            value: "black",
            label: "Black",
          },
          {
            value: "green",
            label: "Green",
          },
        ],
        value: "woundColor",
        type: "MultiSelect_Creatable",
        placeholder: "Select the color(s) that applies",
        span: 3,
      },
      {
        name: "surroundingSkin",
        label: "Surrounding Skin",
        options: [
          {
            value: "healthy",
            label: "Healthy",
          },
          {
            value: "dry_scaly",
            label: "Dry/scaly",
          },
          {
            value: "eczema",
            label: "Eczema",
          },
          {
            value: "mottled",
            label: "Mottled",
          },
          {
            value: "oedema",
            label: "Oedema",
          },
          {
            value: "discoloration",
            label: "Discoloration",
          },
          {
            value: "induation",
            label: "Induration",
          },
          {
            value: "blistered",
            label: "Blistered",
          },
          {
            value: "macerated",
            label: "Macerateed",
          },
          {
            value: "inflammation",
            label: "Inflammation",
          },
          {
            value: "heat",
            label: "Heat",
          },
          {
            value: "hyperkeratosis",
            label: "Hyperkeratosis",
          },
          {
            value: "contact_dermatitis",
            label: "Contact dermatitis",
          },
        ],
        value: "surroundingSkin",
        type: "MultiSelect_Creatable",
        placeholder: "Select the one(s) that applies",
        span: 3,
      },
      {
        name: "painType",
        label: "Pain Type",
        options: [
          {
            value: "chronic",
            label: "Chronic",
          },
          {
            value: "on_movement",
            label: "On movement",
          },
          {
            value: "at_dressing_changee",
            label: "At dressing changee",
          },
          {
            value: "None",
            label: "none",
          },
          {
            value: "other",
            label: "Other",
          },
        ],
        value: "surroundingSkin",
        type: "MultiSelect_Creatable",
        placeholder: "Select the one(s) that applies",
        span: 3,
      },
      {
        name: "painLevel",
        label: "Pain Level",
        value: "painLevel",
        type: "Number",
        placeholder:
          "Please rate the level of pain (1-10, 10 meaning extreme pain)",
        span: 3,
        constraints: {
          required: true,
          maxValue: 10,
          minValue: 1,
        },
      },
      {
        name: "odor",
        label: "Odor",
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
        value: "Odor",
        type: "Radio",
        placeholder: "Is there an odor present",
        span: 3,
      },
      {
        name: "woundLength",
        label: "Wound Length",
        value: "woundLength",
        type: "OneLineText",
        placeholder:
          "(optional) Provide the dimensions of your in the following format - Lenght:X, Width:X, Depth:x ",
        span: 3,
        constraints: {
          required: false,
        },
      },
    ],
  },
];
