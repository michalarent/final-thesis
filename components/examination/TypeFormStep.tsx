import { Button, Checkbox, Form, TextInput } from "carbon-components-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import styled from "styled-components";
import { ArentFlex, ArentGrid } from "../ui/navigation/layout/ArentGrid";
import FormItem from "./FormItem";
import SelectOptionMaker from "./SelectOptionMaker";

type TypeFormInputType = "Image" | "Select" | "Text";

export default function TypeFormStep({
  stepValue,
  stepNumber,
  values,
  setValues,
}) {
  const [stepType, setStepType] = useState<TypeFormInputType>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [shouldDisable, setShouldDisable] = useState(false);
  useEffect(() => {
    if (
      values[stepNumber].inputs.title === title &&
      values[stepNumber].inputs.options === options &&
      values[stepNumber].inputs.description === description
    )
      setShouldDisable(true);
    else setShouldDisable(false);
  }, [values, title, description, options]);

  if (!stepType) {
    return (
      <TypeFormPickType stepNumber={stepNumber} setStepType={setStepType} />
    );
  }

  const handleSubmit = (event) => {
    const formData = new FormData(event.currentTarget);
    event.preventDefault();

    if (values[stepNumber]) {
      // add new empty step

      if (stepType === "Select") {
        setValues((prevValues) => {
          const newValues = [...prevValues];
          newValues[stepNumber] = {
            ...newValues[stepNumber],
            type: stepType,
            correct: true,

            inputs: {
              ...newValues[stepNumber].inputs,
              options,
              title: formData.get("title"),
              description: formData.get("description"),
            },
          };
          return newValues;
        });
      } else {
        setValues((prevValues) => {
          const newValues = [...prevValues];
          newValues[stepNumber] = {
            ...newValues[stepNumber],
            type: stepType,
            correct: true,
            inputs: {
              ...newValues[stepNumber].inputs,
              title: formData.get("title"),
              description: formData.get("description"),
            },
          };
          return newValues;
        });
      }
    }

    console.log(formData.entries());
  };

  return (
    <motion.div
      style={{ width: "100%" }}
      key={`${stepNumber}-form-item`}
      exit={{ opacity: 0, y: 100 }}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Container>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <ArentGrid columns="1fr 3fr 1fr" gap={20}>
            <ArentFlex direction="column" gap={10}>
              <h3>Step {stepNumber + 1}</h3>
              <h4>{stepType}</h4>
            </ArentFlex>
            <ArentGrid
              columns={stepType === "Select" ? "1fr 1fr" : "1fr"}
              gap={20}
            >
              <ArentFlex direction="column" gap={10} width="100%">
                <TextInput
                  id="step-title"
                  labelText=""
                  required
                  value={title}
                  name="title"
                  invalid={title.length > 0 && title.length < 4}
                  style={{ width: "100%" }}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter step title"
                />
                <TextInput
                  id="step-description"
                  labelText=""
                  invalid={description.length > 0 && description.length < 4}
                  value={description}
                  name="description"
                  style={{ width: "100%" }}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter step description"
                />
              </ArentFlex>
              {stepType === "Select" && (
                <SelectOptionMaker setSelect={setOptions} options={options} />
              )}
            </ArentGrid>
            <ArentFlex direction="column" width="100%" gap={10}>
              <Checkbox
                id={`checkbox-${stepNumber}`}
                labelText="Required?"
                checked={isChecked}
                onChange={setIsChecked}
              />
              <Button
                disabled={title.length < 4 || shouldDisable}
                type="submit"
              >
                {values[stepNumber].correct ? "Update" : "Assign"}
              </Button>
            </ArentFlex>
          </ArentGrid>
        </Form>
        <RemoveButton
          onClick={() => {
            setValues((prevValues) => {
              const newValues = [...prevValues];
              newValues.splice(stepNumber, 1);
              return newValues;
            });
          }}
        >
          <IoCloseSharp />
        </RemoveButton>
      </Container>
    </motion.div>
  );
}

export function TypeFormPickType({ stepNumber, setStepType }) {
  return (
    <motion.div
      style={{ width: "100%" }}
      key={`${stepNumber}-type-form-item`}
      exit={{ opacity: 0, y: -100 }}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Container>
        <ArentGrid columns="1fr 1fr 1fr 1fr">
          {["Image", "Select", "Text"].map((type) => (
            <FormItem
              type={type as TypeFormInputType}
              onClick={() => setStepType(type)}
            />
          ))}
        </ArentGrid>
      </Container>
    </motion.div>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 5px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  justify-content: center;

  position: relative;
  height: 180px;
  & .bx--text-input-wrapper {
    width: 100%;
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;

  background-color: #f5f5f5;
  border: none;
  border-radius: 50%;
  padding: 10px;
  color: black;
  font-size: 30px;
  cursor: pointer;
`;
