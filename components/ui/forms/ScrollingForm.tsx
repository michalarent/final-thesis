import { Button, CircularProgress } from "@material-ui/core";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  IoArrowForwardOutline, IoChevronDownOutline,
  IoChevronUpOutline,
  IoSendOutline
} from "react-icons/io5";
import { polyfill } from "seamless-scroll-polyfill";
import styled from "styled-components";
import { GeneralFormInput } from "../../../data/general/general";
import { FormInput } from "../../../data/types";
import useKeyPress from "../../../hooks/useKeyPress";
import { useUser } from "../../../hooks/user";
import { colors } from "../../../theme/colors";
import { ButtonGrid, NiceButton } from "./ButtonGrid";
import { Inputs, StepNumber } from "./Inputs";
import { RENDERERS } from "./renderers/renderers";


// kick off the polyfill!

type FormType = "General" | "Wound" | "Appointment";

const FormGrid = styled.div`
  padding: 20px 50px;
  border-radius: 20px;
  margin-top: 50px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  min-height: 800px;
  margin-top: 40px;
`;

const ActiveIndicator = styled.div<{ current?: boolean }>`
  position: absolute;
  cursor: ${(props) => (props.current ? "default" : "pointer")};
  top: 20px;
  right: 20px;
  width: 20px;
  height: 20px;
  z-index: 200;
  border-radius: 50%;
  pointer-events: auto;

  background-color: ${(props) =>
    props.current ? colors.aquamarine : "transparent"};
  > div {
  }
`;
const InputContainer = styled(motion.div)<{ span: number; visible?: boolean }>`
  grid-column: span ${(props) => props.span || "6"};
  //   display: ${(props) => (props.visible ? "block" : "none")};
`;

export default function ScrollingForm({
  step,
  formType,
  multi,
}: {
  step?: number;
  formType?: FormType;
  multi?: boolean;
}) {
  const data = GeneralFormInput;

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

  const user = useUser();

  polyfill();
  //   smoothscroll.polyfill();

  const [currentStep, setCurrentStep] = useState(0);

  if (!user) {
    return <CircularProgress />;
  }

  const values: Record<string, string> = { "": "" };

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

  const handleNextStep = (event, id) => {
    event?.stopPropagation();
    setCurrentStep((cur) => cur + 1);
    let ref = divRefs[currentStep + 1];
    scrollSmoothHandler(ref);
  };

  const handlePreviousStep = (event, id) => {
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
      if (getValues(data[currentStep].inputs[0].name) == undefined) {
        setCurrentStepValid(false);
      }
    } else {
      console.log("invalid");
      setCurrentStepValid(false);
    }
  }, [getValues()]);

  useKeyPress("ArrowRight", () => handleNextStep());
  useKeyPress("ArrowUp", (event) => handlePreviousStep(event));

  console.log(currentStepValid);
  return (
    <form key="_form">
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
                }}
              >
                <Inputs
                  key={`inputs_${thisStep}`}
                  style={{ border: "1px solid" }}
                  initial={{ borderColor: "#F8F8F8" }}
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
                  <StepNumber current={step.step == currentStep}>
                    {index + 1}
                  </StepNumber>

                  <h3>{step.label}</h3>
                  <p>{step.description}</p>
                  <ButtonGrid current={step.step == currentStep}>
                    <>
                      <div>
                        {currentStep > 0 ? (
                          <Button
                            style={{ cursor: "pointer" }}
                            onClick={(event) =>
                              handlePreviousStep(event, refId)
                            }
                          >
                            <IoChevronUpOutline size="30px" />
                          </Button>
                        ) : (
                          <div />
                        )}
                      </div>
                      <div className={"submit"}>
                        {isValid ? <IoSendOutline /> : <div />}
                      </div>
                      <div className="up">
                        {currentStep < data.length - 1 ? (
                          <Button
                            style={{ cursor: "pointer" }}
                            onClick={(event) => handleNextStep(event, refId)}
                          >
                            <IoChevronDownOutline size="30px" />
                          </Button>
                        ) : (
                          <div />
                        )}
                      </div>
                    </>
                  </ButtonGrid>

                  {step.inputs.map((input) =>
                    renderParam(
                      input,
                      step.step,

                      step.step == currentStep,
                      step.label
                    )
                  )}
                  <NiceButton
                    correct={currentStepValid}
                    onClick={(event) => handleNextStep(event, refId)}
                  >
                    Continue <IoArrowForwardOutline />
                  </NiceButton>
                </Inputs>
              </div>
            );
          })}
        </FormGrid>
      </Container>
    </form>
  );
}
