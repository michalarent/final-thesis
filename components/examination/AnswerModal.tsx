import apiCall from "../../common/api/ApiCall";
import ScheduledExaminationForm from "../../db/ScheduledExaminationForm";
import useLoaderSWR, { Loader } from "../../hooks/useLoaderSWR";
import { modalStyles } from "../modal_styles";
import Modal from "react-modal";
import { InlineLoading } from "carbon-components-react";
import ExaminationFormAnswer from "../../db/ExaminationFormAnswer";

export default function AnswerModal({
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
  const answer: Loader<ExaminationFormAnswer> = useLoaderSWR(
    `examination-answer-${examination?.id}`,
    async () => {
      return await apiCall(
        `/api/treatment/examinations/${examination?.id}`,
        "GET"
      );
    }
  );

  return (
    <Modal
      isOpen={visible}
      onRequestClose={() => setVisible(false)}
      style={modalStyles}
    >
      {answer.status === "loading" && <InlineLoading />}
      {answer.status === "error" && <div>Error loading answer</div>}
      {answer.status === "ready" && (
        <div>
          {answer.value.formData.images != null &&
          answer.value.formData.images.length
            ? answer.value.formData.images.map((img) => (
                <img src={img} width="50%" />
              ))
            : null}
          {Object.keys(answer.value.formData)
            .filter((obj) => obj !== "images" && obj !== "Image")
            .map((obj) => (
              <div>{JSON.stringify(answer.value.formData[obj])}</div>
            ))}
        </div>
      )}
    </Modal>
  );
}
