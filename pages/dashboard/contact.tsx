import { Button, Loading, Tile } from "carbon-components-react";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import ChatBox from "../../components/ChatBox";
import ListDoctors from "../../components/ListDoctors";
import { Container } from "../../components/ui/Container";
import LayoutBase from "../../components/ui/navigation/layout";
import { ArentFlex } from "../../components/ui/navigation/layout/ArentGrid";
import { Doctor } from "../../db/Doctor";
import { useDoctors } from "../../hooks/user";
import { getDoctorsRelatedToPatientFromBackend } from "../../hooks/user/helpers";
import usePatientInfo from "../../hooks/user/usePatientInfo";
import patient from "../api/patient";

export default function Contact() {
  const { basics, patientData, doctorData } = usePatientInfo();
  const [relatedDoctors, setRelatedDoctors] = useState<Doctor>();

  const basicsReady = basics.status === "ready";
  const patientDataReady = basicsReady && patientData.status === "ready";
  const doctorDataReady = basicsReady && doctorData.status === "ready";

  const ready = basicsReady && patientDataReady && doctorDataReady;

  async function getRelatedDoctors() {
    if (ready) {
      const response = await getDoctorsRelatedToPatientFromBackend(
        basics.value.user.authId
      );
      setRelatedDoctors(response);
    }
  }

  useEffect(() => {
    if (ready && !relatedDoctors) {
      getRelatedDoctors();
    }
  }, [basics]);

  if (!ready) {
    return <Loading />;
  }

  if (ready && relatedDoctors) {
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
