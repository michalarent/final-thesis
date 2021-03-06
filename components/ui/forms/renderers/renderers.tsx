import {
  NumberInput,
  TextInput,
  RadioButton,
  Checkbox,
  RadioButtonGroup,
  TextArea,
  FileUploader,
  FileUploaderButton,
  FileUploaderDropContainer,
  FileUploaderItem,
  DatePicker,
  DatePickerInput,
  TimePicker,
  TimePickerSelect,
  Select as SelectComponent,
} from "carbon-components-react";
import Select from "react-select";
import React from "react";
import { Controller } from "react-hook-form";
import { InputType, FormInput } from "../../../../data/types";
import { countries } from "../countries";

import { colors } from "../../../../theme/colors";
import { ArentFlex } from "../../navigation/layout/ArentGrid";

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

const SELECT_HEIGHT = 40;
const SELECT_MARGIN = 24;
const SELECT_STYLES = {
  control: (base) => ({
    ...base,
    borderColor: colors.border,
    // height: SELECT_HEIGHT,
    background: "#f4f4f4",
    borderRadius: 0,
    border: 0,
    borderBottom: "1px solid #8d8d8d",
    overflow: "visible",
    minHeight: 40,
    zIndex: 10000,
    // boxShadow: `0px 0px 2px ${colors.aquamarine}`
  }),
  menuPortal: (provided) => ({ ...provided, zIndex: 999900000 }),
  menu: (provided) => ({ ...provided, zIndex: 1000000000 }),
  valueContainer: (provided, state) => ({
    ...provided,
    zIndex: 10000,
    // maxWidth: "90%",
    // whiteSpace: "nowrap",
    // overflow: "scroll",
    // display: "inline",
  }),
};

const multiValueContainer = ({ selectProps, data }) => {
  const label = data.label;
  const allSelected = selectProps.value;
  const index = allSelected.findIndex((selected) => selected.label === label);
  const isLastSelected = index === allSelected.length - 1;
  const labelSuffix = isLastSelected ? ` (${allSelected.length})` : ", ";
  const val = `${label}${labelSuffix}`;
  return val;
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
        { value: "January", label: "January" },
        { value: "February", label: "February" },
        { value: "March", label: "March" },
        { value: "April", label: "April" },
        { value: "May", label: "May" },
        { value: "June", label: "June" },
        { value: "July", label: "July" },
        { value: "August", label: "August" },
        { value: "September", label: "September" },
        { value: "October", label: "October" },
        { value: "November", label: "November" },
        { value: "December", label: "December" },
      ].map((month) => {
        return { value: month.value, label: month.label };
      });
    case "year":
      let years = [];
      for (let i = 1922; i < 1922 + 100; i++) {
        years.push({ value: i, label: i.toString() });
      }

      return years;
  }
};

//al

export const RENDERERS = {
  OneLineText: (control, errors, param) => (
    <Controller
      defaultValue={""}
      name={param?.name}
      control={control}
      rules={param.constraints}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextInput
          id={param.name}
          defaultValue=""
          required={param.constraints?.required}
          labelText={param.label}
          onChange={onChange}
          value={value}
          invalid={!!error}
          invalidText={error?.message}
          onInput={(e) => {
            if (param.constraints?.inputType === "number")
              e.currentTarget.value = e.currentTarget.value.replace(
                /[^0-9.]/g,
                ""
              );
          }}
          maxLength={param.constraints?.maxLength}
          inputMode={param.constraints?.inputType === "number" ? "tel" : "text"}
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
        <TextArea
          labelText={param.label}
          required={param.required}
          onChange={onChange}
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
        <NumberInput
          id={param.name}
          label={param.label}
          required={param.required}
          onChange={onChange}
          value={value}
          type="number"
        />
      )}
    />
  ),
  Country: (control, errors, param) => (
    <Controller
      name={param.name}
      control={control}
      rules={param.constraints}
      render={({ field: { onChange, value } }) => (
        <>
          <label className="bx--label">{param.label}</label>

          <Select
            label={param.label}
            placeholder={param.label}
            styles={SELECT_STYLES}
            menuPortalTarget={document.body}
            value={countries.find(
              (c) => c.label.toLowerCase() === value?.toLowerCase()
            )}
            onChange={(val) => onChange(val.label)}
            options={countries.map((option) => ({
              label: option.label,
              value: option.code,
            }))}
            components={{
              IndicatorSeparator: () => null,
            }}
          />
        </>
      )}
    />
  ),
  Date: (control, errors, param) => (
    <Controller
      name={param.name}
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange, value } }) => (
        <>
          <label className="bx--label">{param.label}</label>
          <Select
            menuPortalTarget={document.body}
            menuPosition={"fixed"}
            defaultValue={generateOptions(
              new Date().getMonth(),
              new Date().getFullYear(),
              param.name
            ).find((c) => c.label === value)}
            styles={SELECT_STYLES}
            value={generateOptions(
              new Date().getMonth(),
              new Date().getFullYear(),
              param.name
            ).find((c) => c.label === value)}
            onChange={(val) => onChange(val.label)}
            placeholder={"Choose an option"}
            options={generateOptions(
              new Date().getMonth(),
              new Date().getFullYear(),
              param.name
            )}
          />
        </>
      )}
    />
  ),
  Radio: (control, errors, param) => (
    <Controller
      name={param.value}
      control={control}
      rules={param.constraints}
      render={({ field: { onChange, value } }) => (
        <RadioButtonGroup
          name={param.name}
          legendText={param.label}
          defaultSelected={param.default}
          valueSelected={value}
          onChange={onChange}
        >
          {param.options.map((option) => (
            <RadioButton
              key={option.label}
              labelText={option.label}
              about={option.label}
              onChange={onChange}
              value={option.value}
            />
          ))}
        </RadioButtonGroup>
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
              about={option.label}
              id={option.value}
              labelText={option.label}
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
        <>
          <label className="bx--label">{param.label}</label>
          {console.log(param.options)}
          <Select
            label={param.label}
            placeholder={param.label}
            required={param.constraints?.required}
            {...field}
            styles={SELECT_STYLES}
            onChange={(val) => field.onChange(val.label)}
            value={param.options.find(
              (c) => c.label.toLowerCase() === field.value?.toLowerCase()
            )}
            options={param.options.map((option) => ({
              label: option.label,
              value: option.value,
            }))}
            components={{
              IndicatorSeparator: () => null,
            }}
            menuPortalTarget={document.body}
          />
        </>
      )}
    />
  ),
  MultiSelect_Creatable: (control, errors, param) => (
    <Controller
      name={param.value}
      control={control}
      rules={param.constraints}
      render={({ field }) => (
        <>
          <label className="bx--label">{param.label}</label>
          <Select
            label={param.label}
            isMulti
            placeholder={param.label}
            required={param.constraints?.required}
            {...field}
            defaultValue={field.value
              ?.filter((val) => param.options.find((v) => v.label === val))
              .map((option) => ({
                label: option,
                value: option,
              }))}
            value={field.value
              ?.filter((val) => param.options.find((v) => v.label === val))
              .map((option) => ({
                label: option,
                value: option,
              }))}
            onChange={(val) => field.onChange(val.map((v) => v.value))}
            styles={SELECT_STYLES}
            menuPortalTarget={document.body}
            options={param.options.map((option) => ({
              label: option.label,
              value: option.label,
            }))}
            isSearchable={false}
            components={{
              IndicatorSeparator: () => null,
              // MultiValueContainer: multiValueContainer,
            }}
          />
        </>
      )}
    />
  ),
  MultiImage: (control, errors, param) => (
    <Controller
      name={param.value}
      control={control}
      rules={param.constraints}
      render={({ field }) => (
        <ArentFlex
          direction="column"
          align="start"
          justify="start"
          width="100%"
        >
          <label style={{ width: "100%" }} className="bx--label">
            {param.label}
          </label>

          <FileUploaderDropContainer
            multiple
            accept={[".jpg", ".png"]}
            labelText="Drag and drop"
            onAddFiles={(_, { addedFiles }) => {
              field.onChange(addedFiles);
            }}
            style={{ width: "100%" }}
            name={field.value}
          />

          {field.value?.length &&
            field.value.map((file: File) => (
              <FileUploaderItem
                status={"complete"}
                style={{ height: 60, width: "100%" }}
                name={file.name}
              />
            ))}
        </ArentFlex>
      )}
    />
  ),
  ScheduleDay: (control, errors, param) => (
    <Controller
      name={param.value}
      control={control}
      rules={param.constraints}
      render={({ field }) => {
        function getFormattedDate(date) {
          let year = date.getFullYear();
          let month = (1 + date.getMonth()).toString().padStart(2, "0");
          let day = date
            .getDate()
            .toString()
            .padStart(2, "0");

          return month + "/" + day + "/" + year;
        }
        return (
          <DatePicker
            datePickerType="single"
            onChange={field.onChange}
            minDate={getFormattedDate(new Date(Date.now()))}
            defaultValue={getFormattedDate(new Date(Date.now()))}
          >
            <DatePickerInput
              id="date-picker"
              placeholder="mm/dd/yyyy"
              labelText={param.label}
            />
          </DatePicker>
        );
      }}
    />
  ),
  DatePicker: (control, errors, param) => (
    <Controller
      name={param.value}
      control={control}
      rules={param.constraints}
      render={({ field }) => {
        function getFormattedDate(date) {
          let year = date.getFullYear();
          let month = (1 + date.getMonth()).toString().padStart(2, "0");
          let day = date
            .getDate()
            .toString()
            .padStart(2, "0");

          return month + "/" + day + "/" + year;
        }
        return (
          <DatePicker
            datePickerType="single"
            onChange={field.onChange}
            maxDate={getFormattedDate(new Date(Date.now()))}
            minDate={getFormattedDate(
              new Date(Date.now() - 100 * 365 * 24 * 60 * 60 * 1000)
            )}
            defaultValue={getFormattedDate(new Date(Date.now()))}
          >
            <DatePickerInput
              id="date-picker"
              placeholder="mm/dd/yyyy"
              labelText={param.label}
            />
          </DatePicker>
        );
      }}
    />
  ),
  ScheduleTime: (control, errors, param) => (
    <Controller
      name={param.name}
      control={control}
      rules={param.constraints}
      render={({ field: { onChange, value } }) => {
        function generateOptions() {
          var times = [];
          for (var i = 9; i < 19; i++) {
            for (var j = 0; j < 60; j += 15) {
              if (j === 0) {
                if (i === 9) {
                  times.push({ value: "09:00", label: "09:00" });
                } else times.push({ value: "0" + i + ":00", label: i + ":00" });
              } else if (i === 9) {
                times.push({ value: "09:" + j, label: "09:" + j });
              } else times.push({ value: i + ":" + j, label: i + ":" + j });
            }
          }
          return times;
        }

        return (
          <>
            <label className="bx--label">{param.label}</label>
            <Select
              label={param.label}
              placeholder={param.label}
              styles={SELECT_STYLES}
              menuPortalTarget={document.body}
              value={generateOptions().find((c) => c.label === value)}
              onChange={(val) => onChange(val.label)}
              options={generateOptions().map((option) => ({
                label: option.label,
                value: option.code,
              }))}
              defaultValue={generateOptions()[0]}
              components={{
                IndicatorSeparator: () => null,
              }}
            />
          </>
        );
      }}
    />
  ),
};
