import { InlineLoading, Link } from "carbon-components-react";
import apiCall from "../../common/api/ApiCall";
import ExaminationFormTemplate from "../../db/ExaminationFormTemplate";
import useLoaderSWR from "../../hooks/useLoaderSWR";
import { ArentFlex, ArentGrid } from "../ui/navigation/layout/ArentGrid";
import { Divider } from "../util/Divider";
import ExaminationItem from "./ExaminationItem";

async function getTemplates(): Promise<ExaminationFormTemplate[]> {
  return await apiCall("/api/doctor/templates", "GET");
}

export default function DoctorExaminationsTab({ basics, treatmentId }) {
  const templates = useLoaderSWR(
    `${basics.user.authId}-templates`,
    getTemplates
  );

  if (templates.status === "loading") {
    return <InlineLoading />;
  }
  if (templates.status === "error") {
    return <div>Error loading templates</div>;
  }

  return (
    <div style={{ padding: 20 }}>
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
        <h2>There are no examinations currently scheduled</h2>
      </ArentFlex>
    </div>
  );
}
