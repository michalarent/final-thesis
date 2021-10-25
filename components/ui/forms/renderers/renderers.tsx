import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
} from "@material-ui/core";
import Select from "react-select";
import React from "react";
import { Controller } from "react-hook-form";
import { InputType, FormInput } from "../../../../data/types";
import { countries } from "../countries";
import { withStyles } from "@material-ui/core/styles";
import { colors } from "../../../../theme/colors";

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

const options = getDaysInMonthArray(0, 2021).map((day) => ({
  value: day,
  label: day.toString(),
}));

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

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: colors.aquamarine,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: colors.aquamarine,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: colors.border,
      },
      "&:hover fieldset": {
        borderColor: colors.lightaquamarine,
      },
      "&.Mui-focused fieldset": {
        borderColor: colors.aquamarine,
      },
    },
  },
})(TextField);

export const RENDERERS: Record<
  InputType,
  (control: any, errors: any, param: FormInput) => any
> = {
  OneLineText: (control, errors, param) => (
    <Controller
      defaultValue={""}
      name={param.name}
      control={control}
      rules={param.constraints}
      render={({ field: { onChange, value } }) => (
        <CssTextField
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
  MultiLineText: (control, errors, param) => (
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
  Number: (control, errors, param) => (
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
  Country: (control, errors, param) => (
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
              borderColor: colors.border,
              width: "100%",
              height: "57px",
              minHeight: "",
            }),
            menu: (provided) => ({
              ...provided,
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
  Date: (control, errors, param) => (
    <Controller
      defaultValue={undefined}
      name={param.name}
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <Select
          menuPortalTarget={document.body}
          menuPosition={"fixed"}
          styles={{
            control: (base) => ({
              ...base,
              borderColor: colors.border,
              height: 57,
              minHeight: 57,
              // boxShadow: `0px 0px 2px ${colors.aquamarine}`
            }),
            menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
            menu: (provided) => ({ ...provided, zIndex: 9999 }),
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
  Radio: (control, errors, param) => (
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
  Checkbox: (control, errors, param) => (
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
  Select: (control, errors, param) => (
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
            }),
            menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
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
  MultiSelect_Creatable: (control, errors, param) => (
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
