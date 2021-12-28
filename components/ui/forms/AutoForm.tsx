import { Button } from "carbon-components-react";
import { AnimatePresence, motion } from "framer-motion";
import { useS3Upload } from "next-s3-upload";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import apiCall from "../../../common/api/ApiCall";
import { GeneralFormInput } from "../../../data/general/general";
import { FormInput } from "../../../data/types";
import { useUser } from "../../../hooks/user";
import { colors } from "../../../theme/colors";
import { RENDERERS } from "./renderers/renderers";

type FormType = "General" | "Wound" | "Appointment";

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-gap: 50px 20px;
  align-items: start;

  position: relative;
  height: 600px;
  width: 800px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
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

  function renderParam(param: FormInput) {
    console.log(param);
    return <AnimatePresence exitBeforeEnter></AnimatePresence>;
  }

  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        console.log(initialData);

        setValue(key, initialData[key]);
      });
    }
  }, [initialData]);

  async function onSubmit() {
    if (isValid) {
      if (getValues() && getValues().images) {
        console.log("*** WILL UPLOAD ***");
        const files = getValues().images;
        let imageUrls = await handleFiles(files);
        console.log(imageUrls);
        setValue("images", imageUrls);
      }
      console.log(getValues());
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
      }
    }
  }

  return (
    <form key="_form" onSubmit={handleSubmit(onSubmit)}>
      <Container key={`_container`}>
        {console.log(watch())}
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
      </Container>
    </form>
  );
}
