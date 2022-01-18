import { Button, Loading, Tile } from "carbon-components-react";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import ChatBox from "../../components/ChatBox";
import ListDoctors from "../../components/ListDoctors";
import { Container } from "../../components/ui/Container";
import LayoutBase from "../../components/ui/navigation/layout";
import { ArentFlex } from "../../components/ui/navigation/layout/ArentGrid";
import { Doctor } from "../../db/Doctor";
import { getLastMessages } from "../../helpers/chat";
import { getListOfAllUniquePatientsFromAppointments } from "../../helpers/doctor";
import { ConsolidatedPatient } from "../../helpers/doctor/types";
import { useDoctors } from "../../hooks/user";
import { getDoctorsRelatedToPatientFromBackend } from "../../hooks/user/helpers";
import usePatientInfo from "../../hooks/user/usePatientInfo";
import patient from "../api/patient";

export default function Contact() {
  const { basics, patientData, doctorData } = usePatientInfo();
  const [relatedPeople, setRelatedPeople] = useState<
    Doctor[] | ConsolidatedPatient[]
  >();

  const basicsReady = basics.status === "ready";
  const patientDataReady = basicsReady && patientData.status === "ready";
  const doctorDataReady = basicsReady && doctorData.status === "ready";

  const ready = basicsReady && patientDataReady && doctorDataReady;

  async function getRelatedPeople() {
    if (ready) {
      if (patientData.value.isPatient) {
        const response = await getDoctorsRelatedToPatientFromBackend(
          basics.value.user.authId
        );
        setRelatedPeople(response);
      } else {
        const allPeople = getListOfAllUniquePatientsFromAppointments(
          doctorData.value.doctor.appointments
        );
        setRelatedPeople(allPeople);
      }
    }
  }

  useEffect(() => {
    if (ready && !relatedPeople) {
      getRelatedPeople();
    }
  }, [basics]);

  if (!ready) {
    return <Loading />;
  }

  if (ready && doctorData.value.isDoctor && relatedPeople) {
    return (
      <LayoutBase title="Contact" breadcrumbs={["Dashboard", "Contact"]}>
        <Container>
          {relatedPeople.map((d) => {
            return (
              <ArentFlex direction="column" gap={10} width="100%">
                <h3>Chat with {d.name}</h3>
                <ChatBox
                  sender={basics.value.user.authId}
                  receiver={d.authId}
                />
              </ArentFlex>
            );
          })}
        </Container>
      </LayoutBase>
    );
  }

  if (ready && relatedPeople) {
    console.log(patientData);
    return (
      <LayoutBase title="Contact" breadcrumbs={["Dashboard", "Contact"]}>
        <Container>
          {relatedDoctors.map((d) => {
            return (
              <ArentFlex direction="column" gap={10} width="100%">
                <h3>
                  Chat with {d.doctorData.firstName} {d.doctorData.lastName}
                </h3>
                <ChatBox
                  sender={basics.value.user.authId}
                  receiver={d.authId}
                />
              </ArentFlex>
            );
          })}
        </Container>
      </LayoutBase>
    );
  } else {
    return <Loading />;
  }
}
