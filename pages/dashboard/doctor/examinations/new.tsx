import { Button, Checkbox, TextArea, TextInput } from "carbon-components-react";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import apiCall from "../../../../common/api/ApiCall";
import AddedFormItem from "../../../../components/examination/AddedFormItem";
import FormItem from "../../../../components/examination/FormItem";
import TypeForm from "../../../../components/examination/TypeForm";
import TypeFormStep from "../../../../components/examination/TypeFormStep";
import { Container } from "../../../../components/ui/Container";
import LayoutBase from "../../../../components/ui/navigation/layout";
import {
  ArentFlex,
  ArentGrid,
} from "../../../../components/ui/navigation/layout/ArentGrid";
import ClientError from "../../../../components/util/ClientError";
import ClientLoading from "../../../../components/util/ClientLoading";
import { FormInput, InputType } from "../../../../data/types";
import ExaminationFormTemplate from "../../../../db/ExaminationFormTemplate";
import useUserInfo from "../../../../hooks/user/usePatientInfo";
import { colors } from "../../../../theme/colors";

export default function NewExaminationPage() {
  const router = useRouter();
  const { basics } = useUserInfo();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [values, setValues] = useState<
    {
      step: number;
      correct: boolean;
      type: string;
      inputs: {
        title: string;
        required: false;
        description: string;
        options?: string[];
      };
    }[]
  >([
    {
      step: 0,
      correct: false,
      type: "",
      inputs: {
        title: "",
        required: false,
        description: "",
      },
    },
  ]);

  const [activeStep, setActiveStep] = useState<{
    numStep: number;
    type: string;
  }>(null);

  console.log(values);

  useEffect(() => {
    if (activeStep) {
      if (values && values[activeStep.numStep]) {
        // if title and description of a step is not empty set correct to true
        if (
          values[activeStep.numStep].inputs.title !== "" &&
          values[activeStep.numStep].inputs.description !== ""
        ) {
          setValues((values) => {
            values[activeStep.numStep].correct = true;
            return values;
          });
        } else {
          setValues((values) => {
            values[activeStep.numStep].correct = false;
            return values;
          });
        }
      }
    }
  }, [values, activeStep]);

  if (basics.status === "loading") {
    return <ClientLoading />;
  }

  if (basics.status === "error") {
    return <ClientError>Error loading user</ClientError>;
  }

  const INPUT_TYPE_TO_FORM_INPUT: Record<string, InputType> = {
    Text: "OneLineText" as InputType,
    Image: "MultiImage" as InputType,
    Select: "Select" as InputType,
  };

  async function submitExaminationTemplates() {
    if (values.length === 0) {
      return;
    } else {
      const newExaminationTemplate: Partial<ExaminationFormTemplate> = {
        title: title,
        description: description,
        inputs: values.map((value) => ({
          label: value.inputs.title,
          description: value.inputs.description,
          required: value.inputs.required,
          type: INPUT_TYPE_TO_FORM_INPUT[value.type],
          options:
            value.type === "Select" &&
            value.inputs.options.map((option) => ({
              label: option,
              value: option,
            })),
          isS3: value.type === "Image" ? true : false,
          name: value.inputs.title,
          placeholder: value.inputs.title,
          value: value.type,
        })),
      };
      const response = await apiCall("/api/doctor/templates", "POST", {
        title: newExaminationTemplate.title,
        data: newExaminationTemplate.inputs,
      });
    }
  }
  return (
    <LayoutBase
      title="New Examination Panel"
      breadcrumbs={["Dashboard", "Examinations"]}
      basics={basics.value}
    >
      {/* <Link href={"/dashboard/doctor/treatments/" + router.query.treatmentId}>
        <FloatingGoBackButton>
          <p>Go back</p>
        </FloatingGoBackButton>
      </Link> */}
      <Container>
        <ArentFlex direction="column" gap={20} width="100%">
          <ArentGrid justify="start" gap={20} columns="auto 1fr">
            Form title:{" "}
            <TextInput
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              labelText=""
              id="title"
              name="title"
              type="text"
              required
            />
          </ArentGrid>
          <ArentGrid justify="start" gap={20} columns="auto 1fr">
            Form description:{" "}
            <TextInput
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              labelText=""
              id="description"
              name="description"
              type="text"
              required
            />
          </ArentGrid>
          <ArentGrid align="start" columns="1fr 3fr" gap={20}>
            <AnimatePresence exitBeforeEnter>
              <ArentFlex direction="column" width="100%" gap={20}>
                {values.map((value, index) => {
                  return <AddedFormItem item={value} />;
                })}
              </ArentFlex>
            </AnimatePresence>
            <AnimatePresence exitBeforeEnter>
              <ArentFlex direction="column" gap={20} width="100%">
                {values.map((value, index) => {
                  return (
                    <TypeFormStep
                      setValues={setValues}
                      stepNumber={index}
                      values={values}
                      stepValue={value}
                    />
                  );
                })}

                <ArentFlex gap={20} width="100%" justify="space-between">
                  <Button
                    disabled={values[values.length - 1].correct === false}
                    onClick={() => {
                      setValues((values) => {
                        return [
                          ...values,
                          {
                            step: values.length,
                            correct: false,
                            type: "",
                            inputs: {
                              title: "",
                              required: false,
                              description: "",
                            },
                          },
                        ];
                      });
                    }}
                  >
                    Add new
                  </Button>
                  <Button
                    // disabled={true}
                    style={{
                      justifySelf: "flex-end",
                    }}
                    onClick={() => submitExaminationTemplates()}
                  >
                    Submit These Items
                  </Button>
                </ArentFlex>
              </ArentFlex>
            </AnimatePresence>
          </ArentGrid>
        </ArentFlex>
      </Container>
    </LayoutBase>
  );
}

const FloatingGoBackButton = styled.button`
  position: fixed;
  top: 50;
  left: 20;
  z-index: 100;
  background-color: #0043ce;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;

  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.02);
  }
`;
