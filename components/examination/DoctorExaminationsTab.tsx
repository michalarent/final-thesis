import { InlineLoading, Link } from "carbon-components-react";
import { useState } from "react";
import apiCall from "../../common/api/ApiCall";
import ExaminationFormTemplate from "../../db/ExaminationFormTemplate";
import ScheduledExaminationForm from "../../db/ScheduledExaminationForm";
import useLoaderSWR, { Loader } from "../../hooks/useLoaderSWR";
import { ArentFlex, ArentGrid } from "../ui/navigation/layout/ArentGrid";
import { Divider } from "../util/Divider";
import ExaminationAnswerItem from "./ExaminationAnswerItem";
import ExaminationItem from "./ExaminationItem";
import ScheduledExaminationsList from "./ScheduledExaminationsList";
import SetupExaminationModal from "./SetupExaminationModal";

async function getTemplates(): Promise<ExaminationFormTemplate[]> {
  return await apiCall("/api/doctor/templates", "GET");
}

export default function DoctorExaminationsTab({ basics, treatmentId }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<
    ExaminationFormTemplate
  >();

  const templates = useLoaderSWR(
    `${basics.user.authId}-templates`,
    getTemplates
  );

  const scheduledExaminations: Loader<ScheduledExaminationForm[]> = useLoaderSWR(
    `${basics.user.authId}-scheduled-examinations`,
    async () => {
      return await apiCall(
        `/api/treatment/examinations?treatmentId=${treatmentId}`,
        "GET"
      );
    }
  );

  if (templates.status === "loading") {
    return <InlineLoading />;
  }
  if (templates.status === "error") {
    return <div>Error loading templates</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <SetupExaminationModal
        treatmentId={treatmentId}
        visible={modalOpen}
        setVisible={setModalOpen}
        examinationTemplate={currentTemplate}
      />
      <ArentFlex
        style={{ overflow: "visible" }}
        direction="column"
        width="100%"
        gap={20}
      >
        <h2>Examination Templates</h2>
        <ArentGrid gap={20} columns="1fr 1fr 1fr 1fr 1fr">
          {templates.value.map((template) => (
            <ExaminationItem
              title={template.title}
              date={new Date(Date.now()).toISOString()}
              onClick={() => {
                setCurrentTemplate(template);
                setModalOpen(true);
              }}
            />
          ))}

          <Link
            style={{ width: "100%" }}
            href={
              "/dashboard/doctor/examinations/new?treatmentId=" + treatmentId
            }
          >
            <ExaminationItem empty />
          </Link>
        </ArentGrid>
        <Divider />
        <ScheduledExaminationsList
          scheduledExaminations={scheduledExaminations}
        />
      </ArentFlex>
    </div>
  );
}
