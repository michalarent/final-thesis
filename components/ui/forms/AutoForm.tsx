import { Button, CircularProgress, TextField } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { FormInput, InputType } from "../../../data/types";
import { useUser } from "../../../hooks/user";
import Select from "react-select";
import { countries } from "./countries";
import DatePicker from "react-datepicker";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import styled from "styled-components";

import { GeneralFormInput } from "../../../data/general/general";
import { useState } from "react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { colors } from "../../../theme/colors";

type FormType = "General" | "Wound" | "Appointment";

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-gap: 50px 20px;
  margin-top: 40px;
  position: relative;
  height: 214px;
  width: 800px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  height: 800px;
`;

const ButtonGrid = styled.div`
  height: 57px;
  width: 800px;
  grid-gap: 50px 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;
const InputContainer = styled(motion.div)<{ span: number; visible: boolean }>`
  grid-column: span ${(props) => props.span || "6"};
  display: ${(props) => (props.visible ? "block" : "none")};
`;

// generate array with number of days for given month
const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};

// generate array with numbers of days for given month
const getDaysInMonthArray = (month: number, year: number) => {
  const days = [];
  for (let i = 1; i <= getDaysInMonth(month, year); i++) {
    days.push(i);
  }
  return days;
};

const generateOptions = (month: number, year: number, type: string) => {
  switch (type) {
    case "day":
      return getDaysInMonthArray(month, year).map((day) => {
        return { value: day, label: day.toString() };
      });
    case "month":
      return [
        { value: 1, label: "January" },
        { value: 2, label: "February" },
        { value: 3, label: "March" },
        { value: 4, label: "April" },
        { value: 5, label: "May" },
        { value: 6, label: "June" },
        { value: 7, label: "July" },
        { value: 8, label: "August" },
        { value: 9, label: "September" },
        { value: 10, label: "October" },
        { value: 11, label: "November" },
        { value: 12, label: "December" },
      ].map((month) => {
        return { value: month.value, label: month.label };
      });
    case "year":
      return [
        { value: 2020, label: "2020" },
        { value: 2021, label: "2021" },
        { value: 2022, label: "2022" },
        { value: 2023, label: "2023" },
        { value: 2024, label: "2024" },
        { value: 2025, label: "2025" },
        { value: 2026, label: "2026" },
        { value: 2027, label: "2027" },
        { value: 2028, label: "2028" },
        { value: 2029, label: "2029" },
        { value: 2030, label: "2030" },
      ].map((year) => {
        return { value: year.value, label: year.label };
      });
  }
};

const options = getDaysInMonthArray(0, 2021).map((day) => ({
  value: day,
  label: day.toString(),
}));

export default function AutoForm({
  step,
  formType,
  multi,
}: {
  step?: number;
  formType?: FormType;
  multi?: boolean;
}) {
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

  const data = GeneralFormInput;
  const user = useUser();

  const [currentStep, setCurrentStep] = useState(0);
  console.log(currentStep);

  var isCurrentStepValid = data[currentStep].inputs.every(
    (input) => errors[input.name] === undefined
  );

  isCurrentStepValid = data[currentStep].inputs.every((input) =>
    !input.options
      ? watch(input.name) !== undefined
      : getValues(input.name)?.values || getValues(input.name) != null || true
  );

  if (!user) {
    return <CircularProgress />;
  }

  //@ts-ignore
  const RENDERERS: Record<InputType, (param: FormInput) => any> = {
    OneLineText: (param) => (
      <Controller
        defaultValue={""}
        name={param.name}
        control={control}
        rules={param.constraints}
        render={({ field: { onChange, value } }) => (
          <TextField
            inputMode="text"
            defaultValue=""
            error={errors[param.name] ? true : false}
            required={param.constraints?.required}
            style={{ background: "white" }}
            label={param.label}
            onChange={onChange}
            value={value}
            fullWidth
            type="text"
            variant="outlined"
            size="medium"
          />
        )}
      />
    ),
    MultiLineText: (param) => (
      <Controller
        name={param.value}
        control={control}
        rules={param.constraints}
        render={({ field: { onChange, value } }) => (
          <TextField
            label={param.label}
            required={param.required}
            onChange={onChange}
            multiline
            type="textarea"
            variant="outlined"
            rows="3"
          />
        )}
      />
    ),
    Number: (param) => (
      <Controller
        name={param.value}
        control={control}
        rules={param.constraints}
        render={({ field: { onChange, value } }) => (
          <TextField
            label={param.label}
            required={param.required}
            onChange={onChange}
            value={value}
            type="number"
            InputProps={{
              inputProps: {
                max: 10,
                min: 1,
                defaultValue: 3,
              },
            }}
            variant="outlined"
          />
        )}
      />
    ),
    Country: (param) => (
      <Controller
        name={param.name}
        control={control}
        rules={param.constraints}
        render={({ field }) => (
          <Select
            label={param.label}
            placeholder={param.label}
            required={param.constraints?.required}
            {...field}
            styles={{
              control: (base) => ({
                ...base,
                width: "100%",
                height: "57px",
                minHeight: "",
              }),
              menu: (provided) => ({
                ...provided,
                zIndex: 9999,
              }),
            }}
            options={countries.map((option) => ({
              label: option.label,
              value: option.code,
            }))}
            components={{
              IndicatorSeparator: () => null,
            }}
          />
        )}
      />
    ),
    Date: (param) => (
      <Controller
        defaultValue={undefined}
        name={param.name}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Select
            styles={{
              control: (base) => ({
                ...base,
                height: 57,
                minHeight: 57,
              }),
            }}
            {...field}
            placeholder={param.label}
            options={generateOptions(
              new Date().getMonth(),
              new Date().getFullYear(),
              param.name
            )}
          />
        )}
      />
    ),
    Radio: (param) => (
      <Controller
        name={param.value}
        control={control}
        rules={param.constraints}
        render={({ field: { onChange, value } }) => (
          <RadioGroup
            row
            style={{
              height: "57px",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "grid",

                gridTemplateColumns: `repeat(${param.options.length}, 1fr)`,
                width: "100%",
              }}
            >
              {param.options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                  onChange={onChange}
                  style={{
                    alignItems: "center",
                    textAlign: "center",
                    verticalAlign: "middle",
                    justifyContent: "center",
                  }}
                />
              ))}
            </div>
          </RadioGroup>
        )}
      />
    ),
    Checkbox: (param) => (
      <Controller
        name={param.value}
        control={control}
        rules={param.constraints}
        render={({ field: { onChange, value } }) => (
          <>
            {param.options.map((option) => (
              <Checkbox
                name={option.label}
                key={option.value}
                value={option.value}
                onChange={onChange}
              />
            ))}
          </>
        )}
      />
    ),
    Select: (param) => (
      <Controller
        name={param.value}
        control={control}
        rules={param.constraints}
        render={({ field }) => (
          <Select
            label={param.label}
            placeholder={param.label}
            required={param.constraints?.required}
            {...field}
            styles={{
              control: (base) => ({
                ...base,
                width: "100%",
                height: "57px",
                minHeight: "",
              }),
              menu: (provided) => ({
                ...provided,
                zIndex: 9999,
              }),
            }}
            options={param.options.map((option) => ({
              label: option.label,
              value: option.value,
            }))}
            components={{
              IndicatorSeparator: () => null,
            }}
          />
        )}
      />
    ),
    MultiSelect_Creatable: (param) => (
      <Controller
        name={param.value}
        control={control}
        rules={param.constraints}
        render={({ field }) => (
          <Select
            label={param.label}
            isMulti
            placeholder={param.label}
            required={param.constraints?.required}
            {...field}
            styles={{
              control: (base) => ({
                ...base,
                width: "100%",
                height: "57px",
                minHeight: "",
              }),
              menu: (provided) => ({
                ...provided,
                zIndex: 9999,
              }),
            }}
            options={param.options.map((option) => ({
              label: option.label,
              value: option.value,
            }))}
            components={{
              IndicatorSeparator: () => null,
            }}
          />
        )}
      />
    ),
  };

  const values: Record<string, string> = { "": "" };

  function renderParam(param: FormInput, step: number, label: String) {
    return (
      <AnimatePresence exitBeforeEnter>
        <InputContainer
          key={`${currentStep}_${param.name}`}
          initial={{
            opacity: step != currentStep ? 1 : 0.4,
            x: -30,
            display: step == currentStep ? "block" : "none",
          }}
          animate={{
            opacity: step == currentStep ? 1 : 0,
            x: 0,
            display: step == currentStep ? "block" : "none",
          }}
          transition={{ duration: 0.2, staggerChildren: 0.1 }}
          span={param.span}
          visible={step == currentStep}
          exit={{
            x: 30,
            opacity: step == currentStep ? 0 : 1,
          }}
        >
          {RENDERERS[param.type](param)}
        </InputContainer>
      </AnimatePresence>
    );
  }

  return (
    <form key="_form">
      <Container key={`_container`}>
        {console.log(watch())}
        <FormGrid key="_formgrid">
          {data.map((step) => (
            <>
              <motion.h3
                key={`_step_${step.step}`}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                style={{
                  display: step.step == currentStep ? "block" : "none",
                  position: "absolute",
                  top: "-50px",
                  left: "0%",
                }}
              >
                {step.label}
              </motion.h3>
              {step.inputs.map((input) =>
                renderParam(input, step.step, step.label)
              )}
            </>
          ))}
        </FormGrid>
        <ButtonGrid>
          <>
            {currentStep > 0 ? (
              <Button
                style={{ background: "whitemilk" }}
                type="button"
                variant="outlined"
                onClick={() => setCurrentStep((cur) => cur + -1)}
              >
                Back
              </Button>
            ) : (
              <div />
            )}
            {currentStep < data.length - 1 ? (
              <Button
                style={{ background: isCurrentStepValid && colors.aquamarine }}
                type="button"
                variant="outlined"
                disabled={!isCurrentStepValid}
                onClick={() => setCurrentStep((cur) => cur + 1)}
              >
                Next
              </Button>
            ) : (
              <div />
            )}

            {isValid ? (
              <Button
                type="submit"
                disabled={!isValid}
                variant="outlined"
                style={{
                  background: isValid ? "blue" : "white",
                  color: "white",
                }}
              >
                Submit
              </Button>
            ) : (
              <div />
            )}
          </>
        </ButtonGrid>
      </Container>
    </form>
  );
}
