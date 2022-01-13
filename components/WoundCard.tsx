import styled from "styled-components";
import { colors } from "../theme/colors";
import { TiDelete } from "react-icons/ti";
import {
  Button,
  OverflowMenu,
  OverflowMenuItem,
} from "carbon-components-react";
import { ArentFlex, ArentGrid } from "./ui/navigation/layout/ArentGrid";
import appointment from "../pages/api/appointment";
import router from "next/router";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border-radius: 5px;
  width: 100%;
  padding: 20px;
  height: 100%;
  position: relative;
  background: ${colors.border};
  & small {
    font-size: 12px;
  }

  & p {
    font-size: 14px;
  }
`;

export const AppointedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border-radius: 5px;
  width: 100%;
  padding: 20px;
  height: 100%;
  color: white;
  position: relative;
  background: #0f62fe;
  & small {
    font-size: 12px;
  }

  & .bx--btn--primary {
    background: white;
    color: black;
  }

  & p {
    font-size: 14px;
  }
`;

export const DeleteIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 0;
  width: 50px;
  height: 50px;
`;

export function WoundCard({
  setCurrentWound,
  setShowModal,
  wound,
  children,
  onDelete,
  appointments,
}) {
  if (wound.appointments.length) {
    console.log(wound.appointments[0].doctor);
    return (
      <AppointedContainer>
        <DeleteIcon onClick={onDelete}>
          <OverflowMenu>
            <OverflowMenuItem onClick={onDelete} itemText="Delete" />
          </OverflowMenu>
        </DeleteIcon>
        <ArentFlex direction="column" align="start" gap={10} width="100%">
          <h5 style={{ width: "90%" }}>
            Appointment at{" "}
            {new Date(wound.appointments[0].date).toLocaleString()}
          </h5>
          <ArentGrid columns="1fr 1fr" gap={2} justify="start">
            <small>Severity</small>
            <p>{wound.woundSeverity}</p>
            <small>Size</small>
            <p>{wound.woundSize}</p>
            <small>Source</small>
            <p>{wound.woundSource}</p>
            <small>Stage</small>
            <p>{wound.woundStage}</p>
            <small>Status</small>
            <p>{wound.woundStatus}</p>
            <small>Type</small>
            <p>{wound.woundType}</p>
          </ArentGrid>
        </ArentFlex>
        <Button
          onClick={() => {
            router.push(`/dashboard/appointments/edit/${appointments[0].id}`);
          }}
        >
          View Appointment
        </Button>
      </AppointedContainer>
    );
  }
  return (
    <Container>
      <DeleteIcon onClick={onDelete}>
        <OverflowMenu>
          <OverflowMenuItem onClick={onDelete} itemText="Delete" />
        </OverflowMenu>
      </DeleteIcon>
      <ArentFlex direction="column" align="start" gap={10} width="100%">
        <h5>{wound.woundLocation} Wound</h5>
        <ArentGrid columns="1fr 1fr" gap={2} justify="start">
          <small>Severity</small>
          <p>{wound.woundSeverity}</p>
          <small>Size</small>
          <p>{wound.woundSize}</p>
          <small>Source</small>
          <p>{wound.woundSource}</p>
          <small>Stage</small>
          <p>{wound.woundStage}</p>
          <small>Status</small>
          <p>{wound.woundStatus}</p>
          <small>Type</small>
          <p>{wound.woundType}</p>
        </ArentGrid>
      </ArentFlex>
      <Button
        onClick={() => {
          setCurrentWound(wound);
          setShowModal(true);
        }}
      >
        Setup Appointment
      </Button>
    </Container>
  );
}
