import { Button, InlineLoading, Loading, Modal } from "carbon-components-react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  IoArrowForwardOutline,
  IoChevronDownOutline,
  IoChevronUpOutline,
  IoSendOutline,
} from "react-icons/io5";
import { polyfill } from "seamless-scroll-polyfill";
import styled from "styled-components";
import { getMedicalHistory } from "../../../common/api";
import apiCall from "../../../common/api/ApiCall";
import { FormInput } from "../../../data/types";
import { useUser } from "../../../hooks/user";
import { colors } from "../../../theme/colors";
import { ArentFlex, ArentGrid } from "../navigation/layout/ArentGrid";
import { ButtonGrid, NiceButton } from "./ButtonGrid";
import { FormContainer, Inputs, StepNumber } from "./Inputs";
import { RENDERERS } from "./renderers/renderers";

// kick off the polyfill!

type FormType = "General" | "Wound" | "Appointment";

const FormGrid = styled.div`
  padding: 20px 20px;

  align-items: start;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: start;

  min-height: 800px;
`;

const InputContainer = styled(motion.div)<{ span: number; visible?: boolean }>`
  grid-column: span ${(props) => props.span || "6"};
  align-self: end;
  //   display: ${(props) => (props.visible ? "block" : "none")};
`;

export default function ScrollingForm({
  step,
  formType,
  multi,
  data,
}: {
  step?: number;
  formType?: FormType;
  multi?: boolean;
  data?: any;
}) {
  const user = useUser();

  async function fetchMedicalHistory(authId) {
    try {
      const medicalHistory = await apiCall(
        "/api/patient/medical_history?user=" + user.authId,
        "GET"
      );
      setInitialData(medicalHistory);
      console.log(medicalHistory);
      Object.keys(medicalHistory).forEach((key) => {
        console.log(medicalHistory);

        setValue(key, medicalHistory[key]);
      });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (user.authId && !initialData) {
      fetchMedicalHistory(user.authId);
    }
  }, [user]);

  polyfill();
  //   smoothscroll.polyfill();

  const [currentStep, setCurrentStep] = useState(0);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [initialData, setInitialData] = useState<any>(null);

  const {
    handleSubmit,
    register,
    reset,
    control,
    watch,
    setValue,
    getValues,

    unregister,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({
    reValidateMode: "onBlur",
    mode: "onChange",
    shouldUnregister: false,
  });

  const values: Record<string, string> = { "": "" };

  const isLastStep = (step) => {
    return step === data?.length - 1;
  };

  console.log(getValues());
  function renderParam(
    param: FormInput,
    step: number,
    current: boolean,
    label: String
  ) {
    return (
      <AnimatePresence exitBeforeEnter>
        <InputContainer
          initial={{
            x: current && -30,
          }}
          animate={{
            x: current && 0,
          }}
          transition={{ duration: 0.2, staggerChildren: 0.1 }}
          span={param.span}
          exit={{
            x: current && 30,
          }}
        >
          {RENDERERS[param.type](control, errors, param)}
        </InputContainer>
      </AnimatePresence>
    );
  }

  let divRefs = [];

  const scrollSmoothHandler = (ref) => {
    console.log(ref);
    console.log(divRefs);
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const handleNextStep = (event) => {
    event?.stopPropagation();
    setCurrentStep((cur) => cur + 1);
    let ref = divRefs[currentStep + 1];
    scrollSmoothHandler(ref);
  };

  const handlePreviousStep = (event) => {
    event?.stopPropagation();
    console.log(currentStep);
    setCurrentStep((cur) => cur - 1);
    console.log(currentStep);
    let ref = divRefs[currentStep - 1];
    scrollSmoothHandler(ref);
  };

  const [currentStepValid, setCurrentStepValid] = useState(false);

  // if one of keys of an object can be found in an other objects keys return true
  function isSubset(superset, subset) {
    return Object.keys(subset).every((key) => key in superset);
  }

  useEffect(() => {
    console.log(Object.keys(errors));

    if (isSubset(data[currentStep].inputs, errors)) {
      console.log("valid");
      setCurrentStepValid(true);

      // FIX THIS
    } else {
      console.log("invalid");
      setCurrentStepValid(false);
    }
  }, [getValues()]);

  console.log(errors);

  // useKeyPress("ArrowRight", (e) => handleNextStep(e));
  // useKeyPress("ArrowUp", (e) => handlePreviousStep(e));

  console.log(currentStepValid);

  const onSubmit = async (data) => {
    console.log(data);
    setSubmitLoading(true);
    try {
      await apiCall("/api/patient/medical_history", "POST", {
        data,
      });
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitLoading(false);
      setSuccess(true);
    }
  };

  return (
    <>
      <form key="_form" onSubmit={handleSubmit(onSubmit)}>
        <Container key={`_container`}>
          <FormGrid key="_formgrid">
            {data.map((step, index) => {
              const newRef = useRef();
              divRefs.push(newRef);
              const refId = divRefs.findIndex((id) => id === newRef);
              const thisStep = step.step;
              return (
                <div
                  id={thisStep.toString()}
                  ref={newRef}
                  // onClick={() => scrollSmoothHandler(newRef)}
                  style={{
                    gridColumn: "span 6",
                    //   scrollMarginBlock: "20vh 0",
                    scrollMarginTop:
                      thisStep == 0 ? "20vh" : `${thisStep * 20}vh`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FormContainer
                    current={step.step == currentStep}
                    isPrevious={step.step < currentStep}
                    onClick={() => setCurrentStep(step.step)}
                  >
                    <ArentGrid
                      style={{ marginBottom: 20 }}
                      columns="auto 1fr"
                      gap={20}
                      width="100%"
                    >
                      <ArentFlex direction="column" align="start" width="100%">
                        <h3>{step.label}</h3>
                        <p>{step.description}</p>
                      </ArentFlex>
                    </ArentGrid>
                    <Inputs
                      key={`inputs_${thisStep}`}
                      animate={{
                        borderColor:
                          step.step == currentStep ? colors.border : "#F8F8F8",
                      }}
                      exit={{ borderColor: "#F8F8F8" }}
                      transition={{ duration: 0.4 }}
                      onClick={() => setCurrentStep(step.step)}
                      current={step.step == currentStep}
                      isPrevious={step.step < currentStep}
                    >
                      {step.inputs.map((input) =>
                        renderParam(
                          input,
                          step.step,

                          step.step == currentStep,
                          step.label
                        )
                      )}
                    </Inputs>
                    <div
                      style={{ position: "absolute", right: 40, bottom: 20 }}
                    >
                      <Button
                        style={{ alignSelf: "end", justifySelf: "end" }}
                        disabled={step.step != currentStep || !currentStepValid}
                        type={isLastStep(step.step) ? "submit" : "button"}
                        onClick={(event) =>
                          !isLastStep(step.step) && handleNextStep(event)
                        }
                      >
                        {isLastStep(step.step) ? (
                          submitLoading ? (
                            <Loading />
                          ) : (
                            "Submit"
                          )
                        ) : (
                          "Continue"
                        )}
                      </Button>
                    </div>
                  </FormContainer>
                </div>
              );
            })}
          </FormGrid>
        </Container>
      </form>
      {success && <Modal open>Success!</Modal>}
    </>
  );
}
