import {
  OverflowMenu,
  OverflowMenuItem,
  SkeletonText,
  Tooltip,
} from "carbon-components-react";
import { DateTime } from "luxon";
import { useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import styled from "styled-components";
import apiCall from "../../common/api/ApiCall";
import { colors } from "../../theme/colors";
import { ArentFlex } from "../ui/navigation/layout/ArentGrid";
import AnswerModal from "./AnswerModal";

export default function ExaminationAnswerItem({
  onClick,
  examinationId,
  title,
  date,
  empty,
  examination,
}: {
  onClick: () => void;
  examinationId: number;
  title?: string;
  date?: any;
  empty?: boolean;
  examination?: any;
}) {
  console.log(examinationId);
  const [answerModalOpen, setAnswerModalOpen] = useState(false);
  if (empty) {
    return (
      <Container style={{ background: "transparent" }}>
        <ArentFlex
          direction="column"
          justify="center"
          align="center"
          height="100%"
          gap={10}
        >
          <p>Add new</p>
          <IoAddCircleSharp size={40} />
        </ArentFlex>
      </Container>
    );
  }

  const handleRemove = async () => {
    onClick();
    await apiCall("/api/treatment/examinations", "DELETE", {
      examinationId,
    });
  };

  console.log(examination);
  return (
    <Container
      style={{ background: title === "completed" && colors.lightaquamarine }}
    >
      <AnswerModal
        visible={answerModalOpen}
        setVisible={setAnswerModalOpen}
        examination={examination}
        treatmentId={undefined}
      />
      <OverflowMenu
        style={{ position: "absolute", top: 10, right: 10, zIndex: 40 }}
      >
        <OverflowMenuItem onClick={handleRemove} itemText="Remove">
          {" "}
        </OverflowMenuItem>
        {title === "completed" && (
          <OverflowMenuItem
            onClick={() => setAnswerModalOpen(true)}
            itemText="View answer"
          />
        )}
      </OverflowMenu>
      <ArentFlex direction="column" justify="space-between" height="100%">
        <p style={{ height: "100%" }}>{title}</p>
        <code>{DateTime.fromISO(date).toLocaleString(DateTime.DATE_HUGE)}</code>
      </ArentFlex>
      <div
        style={{
          position: "absolute",
          opacity: 0.1,
          height: "100%",
          width: "100%",
          top: 0,
          left: 0,
          padding: 10,
        }}
      >
        <ArentFlex direction="column" gap={10} justify="center" height="100%">
          <div style={{ height: 20, width: "50%", background: "black" }} />
          <div style={{ height: 15, width: "100%", background: "black" }} />
          <div style={{ height: 15, width: "100%", background: "black" }} />
          <div
            style={{
              alignSelf: "flex-end",
              height: 20,
              width: "30%",
              background: "black",
            }}
          />
        </ArentFlex>
      </div>
    </Container>
  );
}

const Container = styled.div`
  border-radius: 10px;
  position: relative;
  padding: 10px;
  width: 100%;
  height: 220px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  dispay: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    & p {
      text-decoration: underline;
    }
  }
`;
