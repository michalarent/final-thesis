import { Button } from "carbon-components-react";
import { AnimatePresence, motion } from "framer-motion";
import { useS3Upload } from "next-s3-upload";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import apiCall from "../../../common/api/ApiCall";
import { GeneralFormInput } from "../../../data/general/general";
import { FormInput } from "../../../data/types";
import { useUser } from "../../../hooks/user";
import { colors } from "../../../theme/colors";
import { Container } from "../Container";
import { ArentFlex } from "../navigation/layout/ArentGrid";
import { RENDERERS } from "./renderers/renderers";

type FormType = "General" | "Wound" | "Appointment";

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-gap: 20px 20px;
  align-items: center;

  overflow-x: visible;
  position: relative;

  width: 100%;
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
  width: 100%;
  overflow-x: visible;
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

export default function AutoForm({
  step,
  formType,
  multi,
  data,
  initialData,
  submitUrl,
}: {
  step?: number;
  formType?: FormType;
  multi?: boolean;
  data?: any;
  initialData?: any;
  submitUrl?: string;
}) {
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
    defaultValues: data.reduce((acc, curr) => {
      acc[curr.name] = curr.default;
      return acc;
    }, {}),

    shouldUnregister: false,
  });

  const user = useUser();

  const values: Record<string, string> = { "": "" };

  const handleFiles = async (files) => {
    const urls = [];

    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const { url } = await uploadToS3(file);
      urls.push(url);
    }
    return urls;
  };

  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        setValue(key, initialData[key]);
      });
    }
  }, [initialData]);

  async function onSubmit() {
    if (isValid) {
      if (getValues() && getValues().images) {
        const files = getValues().images;
        let imageUrls = await handleFiles(files);

        setValue("images", imageUrls);
      }

      setSubmitLoading(true);
      try {
        await apiCall(submitUrl, "POST", {
          user: user,
          data: getValues(),
        });
      } catch (e) {
        setError(e.message);
      } finally {
        setSubmitLoading(false);
        setSuccess(true);
        router.push("/dashboard");
      }
    }
  }

  return (
    <Container key={`_container`}>
      <form
        style={{ width: "100%", maxWidth: "800px", overflowX: "visible" }}
        key="_form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormGrid key="_formgrid">
          {data.map((input) => (
            <InputContainer visible={true} span={input.span}>
              {RENDERERS[input.type](control, errors, input)}
            </InputContainer>
          ))}
        </FormGrid>
        <ButtonGrid>
          <>
            <Button type="submit" disabled={!isValid || isSubmitting}>
              Submit
            </Button>
          </>
        </ButtonGrid>
      </form>
    </Container>
  );
}
