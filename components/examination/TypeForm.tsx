import { TextInput } from "carbon-components-react";
import { FormInput, InputType } from "../../data/types";
import AutoForm from "../ui/forms/AutoForm";

export default function TypeForm({
  type,
  values,
  setValues,
}: {
  type: string;
  values: any;
  setValues: any;
}) {
  const TITLE_INPUT = {
    label: "Title",
    name: "title",
    type: "OneLineText" as InputType,
    value: values.title as string,
    required: true,
    placeholder: "Enter title",
  };

  const IMAGE_INPUT: FormInput = {
    label: "Image",
    name: "image",
    type: "Image" as InputType,
    value: "image",
    required: true,
    placeholder: "Enter image",
    isS3: true,
  };

  const SELECT_INPUT = {
    label: "Select",
    name: "select",
    type: "Select" as InputType,
    value: values.select as string,
    required: true,
  };

  const CHECKBOX_INPUT: FormInput = {
    label: "Checkbox",
    name: "checkbox",
    type: "Checkbox" as InputType,
    value: values.checkbox as string,
    required: true,
    placeholder: "Enter checkbox",
  };

  const FORM_INPUTS = {
    Image: IMAGE_INPUT,
    Select: SELECT_INPUT,
    Text: TITLE_INPUT,
    Checkbox: CHECKBOX_INPUT,
  };

  return <AutoForm data={FORM_INPUTS[type]} />;
}
