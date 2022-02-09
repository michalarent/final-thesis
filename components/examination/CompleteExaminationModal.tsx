import { Button } from "carbon-components-react";
import { useS3Upload } from "next-s3-upload";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import styled from "styled-components";
import apiCall from "../../common/api/ApiCall";
import { FormInput } from "../../data/types";
import ScheduledExaminationForm from "../../db/ScheduledExaminationForm";
import { modalStyles } from "../modal_styles";
import { RENDERERS } from "../ui/forms/renderers/renderers";
import { ArentFlex, ArentGrid } from "../ui/navigation/layout/ArentGrid";
import { Divider } from "../util/Divider";

export default function CompleteExaminationModal({
  visible,
  setVisible,
  examination,
  treatmentId,
}: {
  visible;
  setVisible;
  examination: ScheduledExaminationForm;
  treatmentId?;
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
  const { uploadToS3 } = useS3Upload();

  if (!examination) {
    return null;
  }

  const handleFiles = async (files) => {
    const urls = [];

    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const { url } = await uploadToS3(file);
      urls.push(url);
    }
    console.log(urls);
    return urls;
  };

  const onSubmit = async (e) => {
    setRequestLoading(true);
    console.log(examination);
    const urls = await handleFiles(e.Image);

    const dbImages = await apiCall("/api/appointment/images/multi", "POST", {
      woundId: examination.treatment.wound.id,
      images: urls,
    });

    await apiCall(`/api/treatment/examinations/${examination.id}`, "POST", {
      data: {
        images: urls,
        ...e,
      },
    });
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
      <form onSubmit={handleSubmit((e) => onSubmit(e))}>
        <h3>{examination.title}</h3>
        <p>Please fill out the following form.</p>

        <Divider />
        <ArentGrid columns="1fr 1fr" gap={20} style={{ overflow: "visible" }}>
          {examination.formData.map((formInput: FormInput) => (
            <ArentFlex
              direction="column"
              gap={10}
              width="100%"
              style={{ overflow: "visible" }}
            >
              <div
                style={{
                  width: "100%",
                  overflow: "visible",
                  height: "100%",
                  padding: 20,
                  zIndex: 1000,
                }}
              >
                {RENDERERS[formInput.type](control, errors, formInput)}
              </div>
            </ArentFlex>
          ))}
        </ArentGrid>
        <ArentFlex width="100%" justify="flex-end">
          <Button disabled={!isValid} type="submit">
            Submit
          </Button>
        </ArentFlex>
      </form>
      <ArentFlex width="100%" justify="flex-end">
        <img src="/graphics/edit-medication.png" width="50%" />
      </ArentFlex>
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
