import { Button, Loading, Tooltip } from "carbon-components-react";
import { DateTime } from "luxon";
import { useState } from "react";
import Calendar from "react-calendar";
import { useForm } from "react-hook-form";
import { IoAddCircle } from "react-icons/io5";
import Modal from "react-modal";
import styled from "styled-components";
import apiCall from "../../common/api/ApiCall";
import { getStandardDate } from "../../common/util/dates";
import ExaminationFormTemplate from "../../db/ExaminationFormTemplate";
import { modalStyles } from "../modal_styles";
import { RENDERERS } from "../ui/forms/renderers/renderers";
import { ArentFlex, ArentGrid } from "../ui/navigation/layout/ArentGrid";
import { Scrollable } from "../ui/Scrollable";
import ClientLoading from "../util/ClientLoading";
import { Divider } from "../util/Divider";
import AddedFormItem from "./AddedFormItem";

export default function SetupExaminationModal({
  visible,
  setVisible,
  examinationTemplate,
  treatmentId,
}: {
  visible;
  setVisible;
  examinationTemplate: ExaminationFormTemplate;
  treatmentId;
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

  const [showTooltip, setShowTooltip] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [clickedDays, setClickedDays] = useState<string[]>([]);
  if (!examinationTemplate) {
    return null;
  }

  const onSubmit = async () => {
    setRequestLoading(true);
    await apiCall("/api/treatment/examinations", "POST", {
      treatmentId: treatmentId,
      data: examinationTemplate.inputs,
      dates: clickedDays,
      title: examinationTemplate.title,
    });
    setRequestLoading(false);
  };

  return (
    <Modal
      onRequestClose={() => {
        setClickedDays([]);
        setVisible(false);
      }}
      isOpen={visible}
      style={modalStyles}
    >
      {requestLoading && <Loading />}
      <h3>Schedule an examination</h3>
      <Divider />
      <ArentGrid align="start" columns="1fr 2fr">
        <ArentFlex direction="column" width="100%">
          <h5>Inputs:</h5>
          {examinationTemplate.inputs.map((input) => {
            if (input.type === "Select") {
              return (
                <div style={{ padding: 10 }}>
                  <p>
                    {input.type}, options: (
                    {input.options.map((option, index) => (
                      <span>
                        {option.label}
                        {index !== input.options.length - 1 ? ", " : ""}
                      </span>
                    ))}
                    )
                  </p>
                </div>
              );
            } else {
              return (
                <div style={{ padding: 10 }}>
                  <p>
                    Type: {input.type}
                    <br />
                    Title: <i>{input.name}</i>
                  </p>
                  <br />
                </div>
              );
            }
          })}
        </ArentFlex>
        <CalendarContainer>
          <Calendar
            onClickDay={(date) => {
              setCurrentDate(date);
              console.log(date);
              clickedDays.includes(date.toISOString())
                ? setClickedDays(
                    clickedDays.filter((d) => d !== date.toISOString())
                  )
                : setClickedDays([...clickedDays, date.toISOString()]);
              console.log(clickedDays);
            }}
            tileClassName={(date) => {
              if (clickedDays.includes(date.date.toISOString())) {
                return "selected-day";
              }
            }}
          />
        </CalendarContainer>
      </ArentGrid>
      <Divider />

      <ArentGrid align="flex-end" columns="1fr 1fr">
        <ArentFlex direction="column" width="100%">
          <h4>Added Days</h4>
          <Scrollable height="200px" style={{ width: "100%" }}>
            {clickedDays
              .sort(
                (a, b) =>
                  DateTime.fromISO(a).toMillis() -
                  DateTime.fromISO(b).toMillis()
              )
              .map((day) => (
                <p>{getStandardDate(DateTime.fromISO(day).toMillis())}</p>
              ))}
          </Scrollable>
        </ArentFlex>
        <Button onClick={() => onSubmit()} style={{ width: "100%" }}>
          Submit
        </Button>
      </ArentGrid>
    </Modal>
  );
}

const CalendarContainer = styled.div`
  & .selected-day {
    background-color: #023189 !important;
    color: white;
    font-weight: bold;
  }
  & .react-calendar {
    border: none;
  }
`;

const APP_DAY = {
  name: "appointmentDay",
  label: "Day",
  value: "appointmentDay",
  type: "ScheduleDay",
  placeholder: "Pick a Day",
  span: 2,
};

const APP_TIME = {
  name: "appointmentTime",
  label: "Time",
  value: "appointmentTime",
  type: "ScheduleTime",
  placeholder: "Pick a Time",
  span: 2,
};
