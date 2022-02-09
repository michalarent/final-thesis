import {
  ClickableTile,
  InlineLoading,
  Link,
  Tile,
} from "carbon-components-react";
import _ from "lodash";
import { DateTime } from "luxon";
import { useState } from "react";
import apiCall from "../../common/api/ApiCall";
import { getStandardDate } from "../../common/util/dates";
import ExaminationFormTemplate from "../../db/ExaminationFormTemplate";
import ScheduledExaminationForm from "../../db/ScheduledExaminationForm";
import useLoaderSWR, { Loader } from "../../hooks/useLoaderSWR";
import { colors } from "../../theme/colors";
import { ArentFlex, ArentGrid } from "../ui/navigation/layout/ArentGrid";
import { Scrollable } from "../ui/Scrollable";
import { Divider } from "../util/Divider";
import AnswerModal from "./AnswerModal";
import CompleteExaminationModal from "./CompleteExaminationModal";
import ExaminationAnswerItem from "./ExaminationAnswerItem";
import ExaminationItem from "./ExaminationItem";
import ScheduledExaminationItem from "./ScheduledExaminationItem";
import ScheduledExaminationsList from "./ScheduledExaminationsList";
import SetupExaminationModal from "./SetupExaminationModal";

async function getTemplates(): Promise<ExaminationFormTemplate[]> {
  return await apiCall("/api/doctor/templates", "GET");
}

export default function PatientExaminationsTab({ basics, treatmentId }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [answerModalOpen, setAnswerModalOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<
    ScheduledExaminationForm
  >();

  const scheduledExaminations: Loader<ScheduledExaminationForm[]> = useLoaderSWR(
    `${basics.user.authId}-scheduled-examinations`,
    async () => {
      return await apiCall(
        `/api/treatment/examinations?treatmentId=${treatmentId}`,
        "GET"
      );
    }
  );

  if (scheduledExaminations.status === "loading") {
    return <InlineLoading />;
  }

  if (scheduledExaminations.status === "error") {
    return <div>Error loading scheduled examinations</div>;
  }

  const soonestExamination = scheduledExaminations.value.reduce((acc, curr) => {
    if (acc.date) {
      if (
        DateTime.fromISO(curr.date.toString())
          .diff(DateTime.fromJSDate(acc.date))
          .as("days") < 0
      ) {
        return curr;
      }
    } else {
      return curr;
    }
    return acc;
  }, {} as ScheduledExaminationForm);

  const todaysExaminations = scheduledExaminations.value.filter(
    (exam) =>
      DateTime.fromISO(exam.date.toString()).toFormat("yyyy-MM-dd") ===
      DateTime.local().toFormat("yyyy-MM-dd")
  );

  console.log(soonestExamination);
  return (
    <div style={{ padding: 20 }}>
      <CompleteExaminationModal
        examination={currentTemplate}
        visible={modalOpen}
        setVisible={setModalOpen}
      />
      <AnswerModal
        examination={currentTemplate}
        visible={answerModalOpen}
        setVisible={setAnswerModalOpen}
      />
      <ArentFlex
        style={{ overflow: "visible" }}
        direction="column"
        width="100%"
        gap={20}
      >
        <ArentGrid gap={20} align="start" justify="start" columns="1fr 1fr">
          <ArentFlex direction="column" width="100%" gap={20}>
            <h3>Today</h3>
            {todaysExaminations.length === 0 ? (
              <div>
                <p>No examinations scheduled today.</p>
                {soonestExamination != null && soonestExamination.date && (
                  <p style={{ color: "#33f" }}>
                    <b>
                      Next one is on {getStandardDate(soonestExamination.date)}
                    </b>
                  </p>
                )}
              </div>
            ) : (
              todaysExaminations.map((exam) => (
                <ScheduledExaminationItem
                  onButtonClick={() => {
                    setCurrentTemplate(exam);
                    exam.status === "completed"
                      ? setAnswerModalOpen(true)
                      : setModalOpen(true);
                  }}
                  examination={exam}
                />
              ))
            )}
          </ArentFlex>
          <ArentFlex direction="column" width="100%" gap={20}>
            <h3>Upcoming</h3>
            <ArentFlex direction="column" width="100%" gap={20}>
              {scheduledExaminations.value.length ? (
                Object.values(
                  _.groupBy(
                    scheduledExaminations.value.filter(
                      (exam) => !todaysExaminations.includes(exam)
                    ),
                    "formData"
                  )
                ).map((iteratee) => (
                  <div style={{ width: "100%" }}>
                    <h4>{iteratee[0].title}</h4>
                    <>
                      <Scrollable style={{ width: "100%" }} height={"200px"}>
                        <ArentFlex direction="column" gap={10} width="100%">
                          {iteratee
                            .filter(
                              (e) =>
                                !DateTime.fromJSDate(e.date).hasSame(
                                  DateTime.local(),
                                  "day"
                                )
                            )
                            .map((e) => (
                              <Tile
                                style={{
                                  background: colors.border,
                                  width: "100%",
                                  padding: 20,
                                }}
                              >
                                {getStandardDate(e.date)}
                              </Tile>
                            ))}
                        </ArentFlex>
                      </Scrollable>
                    </>
                  </div>
                ))
              ) : (
                <p>
                  No upcoming examinations. Wait for your doctor to schedule
                  something.
                </p>
              )}
            </ArentFlex>
          </ArentFlex>
        </ArentGrid>
      </ArentFlex>
    </div>
  );
}
