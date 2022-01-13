import { Button } from "carbon-components-react";
import { useS3Upload } from "next-s3-upload";
import { useState } from "react";
import { useForm } from "react-hook-form";
import apiCall from "../../../common/api/ApiCall";
import { FormInput } from "../../../data/types";
import { ArentGrid } from "../navigation/layout/ArentGrid";
import { RENDERERS } from "./renderers/renderers";

export const UPLOAD_IMAGE = {
  name: "Images",
  label: "Upload Images",
  value: "images",
  type: "MultiImage",
  placeholder: "Upload Images",
  isS3: true,
  span: 2,
};

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

export default function MeetingForm({ user, wound, doctor }) {
  const [submitLoading, setSubmitLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const { uploadToS3 } = useS3Upload();

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

  const handleFiles = async (files) => {
    const urls = [];

    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const { url } = await uploadToS3(file);
      urls.push(url);
    }
    alert(urls);
    return urls;
  };

  async function onSubmit() {
    if (isValid) {
      if (getValues() && getValues().images) {
        const files = getValues().images;
        let imageUrls = await handleFiles(files);

        setValue("images", imageUrls);
      }

      setSubmitLoading(true);
      try {
        await apiCall("/api/appointment", "POST", {
          user: user,
          requestedDoctor: doctor,
          woundId: wound.woundId,
          data: getValues(),
        });
      } catch (e) {
        setError(e.message);
      } finally {
        setSubmitLoading(false);
        setSuccess(true);
      }
    }
  }

  console.log(watch());

  return (
    <div style={{ width: "100%" }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "100%", maxWidth: "100%", margin: 0, height: "100%" }}
      >
        <ArentGrid
          columns="1fr 1fr"
          width="100%"
          align="center"
          justify="start"
          style={{ height: "100%" }}
        >
          <div style={{ minWidth: "100%", width: "100%" }}>
            {RENDERERS[UPLOAD_IMAGE.type](control, errors, UPLOAD_IMAGE)}
          </div>
          <div>
            {RENDERERS[APP_DAY.type](control, errors, APP_DAY)}{" "}
            {RENDERERS[APP_TIME.type](control, errors, APP_TIME)}
          </div>
        </ArentGrid>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
