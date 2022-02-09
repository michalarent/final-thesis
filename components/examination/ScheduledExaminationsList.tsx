import ScheduledExaminationForm from "../../db/ScheduledExaminationForm";
import { Loader } from "../../hooks/useLoaderSWR";
import { CodeSnippet, InlineLoading } from "carbon-components-react";
import ExaminationItem from "./ExaminationItem";
import ExaminationAnswerItem from "./ExaminationAnswerItem";
import _ from "lodash";
import styled from "styled-components";
import { ArentFlex, ArentGrid } from "../ui/navigation/layout/ArentGrid";
import { mutate } from "swr";

export default function ScheduledExaminationsList({
  scheduledExaminations,
}: {
  scheduledExaminations: Loader<ScheduledExaminationForm[]>;
}) {
  if (scheduledExaminations.status === "loading") {
    return <InlineLoading />;
  }
  if (scheduledExaminations.status === "error") {
    return <div>Error loading scheduled examinations</div>;
  }

  return (
    <div style={{ padding: 20, width: "100%" }}>
      <ArentGrid gap={100} columns="1fr 1fr 1fr" align="start">
        {Object.values(_.groupBy(scheduledExaminations.value, "formData")).map(
          (iteratee: any) => (
            <div style={{ width: "100%" }}>
              <h3 style={{ marginBottom: "0.5rem" }}>{iteratee[0].title}</h3>
              <VerticalStack>
                {iteratee
                  .sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                  )
                  .map((examination, index) => (
                    <VerticalStackItem
                      gap={index * 20}
                      style={{
                        opacity: 1 - index * 0.4,
                        zIndex: iteratee.length - index,
                      }}
                    >
                      <ExaminationAnswerItem
                        onClick={() => scheduledExaminations.mutate()}
                        examinationId={examination.id}
                        title={examination.status}
                        date={examination.date}
                        examination={examination}
                      />
                    </VerticalStackItem>
                  ))}
              </VerticalStack>
            </div>
          )
        )}
      </ArentGrid>
    </div>
  );
}

const VerticalStack = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & div {
    position: absolute;
    top: 0;
  }
`;

const VerticalStackItem = styled.div<{ gap: number }>`
  left: ${(props) => props.gap}px;
  &:hover {
    z-index: 10 !important;
    opacity: 1 !important;
  }
  width: 100%;
`;
