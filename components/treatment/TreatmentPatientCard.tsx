import { OverflowMenu, OverflowMenuItem } from "carbon-components-react";
import styled from "styled-components";
import { getAge, getStandardDate } from "../../common/util/dates";
import {
  WoundLocationIcon,
  WoundSeverityIcon,
  WoundSourceIcon,
  WoundTypeIcon,
} from "../../common/util/icons";
import { capitalizeFirstLetter } from "../../common/util/strings";
import { ConsolidatedAppointment } from "../../helpers/doctor/types";
import { ConsolidatedWound } from "../../hooks/user/types";
import { Avatar } from "../DoctorCard";
import MedicalHistoryTable from "../patient/MedicalHIstoryTable";

import { ArentFlex, ArentGrid } from "../ui/navigation/layout/ArentGrid";
import { Scrollable } from "../ui/Scrollable";
import { Divider } from "../util/Divider";

export default function TreatmentPatientCard({
  wound,
  appointments,
  isDoctor,
}: {
  wound: ConsolidatedWound;
  appointments: ConsolidatedAppointment[];
  isDoctor: boolean;
}) {
  return (
    <Card>
      <ArentFlex direction="column" gap={10} width="100%">
        <ArentGrid columns="auto 1fr auto" gap={20} width="100%">
          <Avatar
            style={{ height: 100, width: 100 }}
            src="https://thispersondoesnotexist.com/image"
          />
          <ArentFlex direction="column" width="100%" gap={5}>
            <h4>{isDoctor ? wound.patient.name : "You"}</h4>
            <strong>
              {capitalizeFirstLetter(wound.patient.medicalHistory.gender)} |{" "}
              {Math.round(getAge(wound.patient.medicalHistory.birthDate))} years
              old
            </strong>
          </ArentFlex>
          <OverflowMenu flipped>
            <OverflowMenuItem
              itemText={`View${!isDoctor && " Your"} Medical History`}
              title={`View${!isDoctor && " Your"} Medical History`}
            >
              View Medical History
            </OverflowMenuItem>
          </OverflowMenu>
        </ArentGrid>
        <Divider />
        <h5>{wound.woundData.woundLocation} Wound</h5>
        <ArentGrid justify="start" columns="1fr 1fr 1fr 1fr">
          <ArentFlex align="center" direction="column" gap={5}>
            <WoundIndicator>
              {WoundSeverityIcon[wound.woundData.woundSeverity]}
            </WoundIndicator>
            <strong>{wound.woundData.woundSeverity}</strong>
          </ArentFlex>
          <ArentFlex align="center" direction="column" gap={5}>
            <WoundIndicator>
              {WoundLocationIcon[wound.woundData.woundLocation]}
            </WoundIndicator>
            <strong>{wound.woundData.woundLocation}</strong>
          </ArentFlex>
          <ArentFlex align="center" direction="column" gap={5}>
            <WoundIndicator>
              {WoundSourceIcon[wound.woundData.woundSource]}
            </WoundIndicator>
            <strong>{wound.woundData.woundSource}</strong>
          </ArentFlex>
          <ArentFlex align="center" direction="column" gap={5}>
            <WoundIndicator>
              {WoundTypeIcon[wound.woundData.woundType]}
            </WoundIndicator>
            <strong>{wound.woundData.woundType}</strong>
          </ArentFlex>
        </ArentGrid>
        <Divider />
        <ArentGrid justify="start" columns="1fr 1fr">
          <h4>Next Consultation</h4>
          <p>
            {appointments[0]
              ? getStandardDate(appointments[0].date)
              : "No appointments set"}
          </p>
        </ArentGrid>
        <Divider />
        <Scrollable height="570px" style={{ width: "100%" }}>
          <MedicalHistoryTable medicalHistory={wound.patient.medicalHistory} />
        </Scrollable>
      </ArentFlex>
    </Card>
  );
}

const Card = styled.div`
  border-radius: 5px;
  width: 100%;
  padding: 20px;

  position: relative;
  background: #f4f4f4;
  height: calc(100vh - 50px);
`;

export const WoundIndicator = styled.div`
  display: flex;

  justify-content: center;
  align-items: start;
  width: 40px;
  height: 40px;
  paddingborder-radius: 50%;
  & svg {
    height: 40px;
    width: 40px;
  }
`;
