import {
  Button,
  ClickableTile,
  Loading,
  Modal,
  Tile,
  CodeSnippet,
} from "carbon-components-react";
import router from "next/router";
import React, { useState } from "react";
import { ReceivedMessage } from "../../components/ChatBox";
import DoctorDashboard from "../../components/dashboards/DoctorDashboard";
import DoctorCard from "../../components/DoctorCard";
import LastChatMessage from "../../components/LastChatMessage";
import { Container } from "../../components/ui/Container";
import LayoutBase from "../../components/ui/navigation/layout";
import {
  ArentFlex,
  ArentGrid,
} from "../../components/ui/navigation/layout/ArentGrid";
import ClientError from "../../components/util/ClientError";
import ClientLoading from "../../components/util/ClientLoading";
import { WoundCard } from "../../components/WoundCard";
import WoundSlider from "../../components/WoundSlider";
import { useDoctors } from "../../hooks/user";
import { deleteWoundFromBackend } from "../../hooks/user/helpers";
import { ConsolidatedWound } from "../../hooks/user/types";
import useUserInfo from "../../hooks/user/usePatientInfo";
import { colors } from "../../theme/colors";
import doctor from "../api/doctor";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [currentWound, setCurrentWound] = useState<ConsolidatedWound>();
  const { basics, patientData, doctorData } = useUserInfo();

  const basicsReady = basics.status === "ready";
  const patientDataReady = basicsReady && patientData.status === "ready";
  const doctorDataReady = basicsReady && doctorData.status === "ready";

  const allDoctors = useDoctors();

  if (basics.status === "error") {
    return (
      <ClientError>
        Error loading basic user data from backend. Possible cause: wrong ID
      </ClientError>
    );
  }

  if (basicsReady && doctorData.status === "error") {
    return (
      <ClientError>
        Error loading doctor data from backend. Possible cause: wrong ID
      </ClientError>
    );
  }

  if (basicsReady && patientData.status === "error") {
    return (
      <ClientError>
        Error loading patient data from backend. Possible cause: wrong ID
      </ClientError>
    );
  }

  const ready = basicsReady && patientDataReady && doctorDataReady;

  if (!ready) {
    return <ClientLoading />;
  }

  if (ready && doctorData.value.isDoctor) {
    return (
      <LayoutBase title="Doctor's Dashboard" breadcrumbs={["Dashboard"]}>
        <Container>
          <DoctorDashboard doctorData={doctorData} />
        </Container>
      </LayoutBase>
    );
  }

  if (ready && patientData.value.isPatient) {
    return (
      <LayoutBase title="Patient's Dashboard" breadcrumbs={["Dashboard"]}>
        {showModal && allDoctors && (
          <Modal
            passiveModal
            open
            onRequestClose={() => {
              setCurrentWound(undefined);
              setShowModal(false);
            }}
          >
            {allDoctors.map((doctor) => (
              <DoctorCard
                user={basics.value}
                currentWound={currentWound}
                key={doctor.id}
                doctor={doctor}
              />
            ))}
          </Modal>
        )}
        <Container>
          <ArentFlex direction="column" height="100%" width="100%" gap={20}>
            <Tile style={{ width: "100%" }}>
              <WoundSlider
                cards={patientData.value.patient.wounds
                  .filter((wound) =>
                    wound.appointments.length
                      ? new Date(wound.appointments[0].date).getTime() >
                        Date.now()
                      : true
                  )
                  .sort((a, b) => {
                    if (!a.appointments.length && !b.appointments.length) {
                      return -1;
                    }
                    return (
                      a.appointments.length &&
                      b.appointments.length &&
                      new Date(a.appointments[0].date).getTime() -
                        new Date(b.appointments[0].date).getTime()
                    );
                  })
                  .map((wound, index) => {
                    return (
                      <WoundCard
                        setCurrentWound={setCurrentWound}
                        wound={wound}
                        setShowModal={setShowModal}
                        appointments={wound.appointments}
                        onDelete={() =>
                          deleteWoundFromBackend(
                            basics.value.authId,
                            wound.woundId
                          )
                        }
                      >
                        {" "}
                      </WoundCard>
                    );
                  })}
              />
            </Tile>
            <ArentFlex
              align="center"
              width="100%"
              height="100%"
              justify="center"
            >
              <ArentGrid align="start" gap={20} columns="1fr 1fr" width="100%">
                <ArentFlex direction="column" width="100%" gap={20}>
                  <Tile style={{ width: "100%", height: 250 }}>
                    <LastChatMessage
                      currentUserId={basics.value.user.authId}
                      chats={patientData.value.patient.chats}
                      isPatient={true}
                    />
                  </Tile>

                  <Tile
                    style={{
                      width: "100%",
                      height: 250,
                      color: "white",
                      background: colors.black,
                    }}
                  >
                    <small>Treatments</small>
                    <h3>You are not undergoing any treatments currently</h3>
                  </Tile>
                </ArentFlex>
                <ArentGrid columns="1fr 1fr" gap={20} width="100%">
                  <ClickableTile
                    onClick={() => router.push("/dashboard/wound/new")}
                    style={{
                      width: "100%",
                      height: 250,
                      background: "crimson",

                      color: "white",
                    }}
                  >
                    <small>Something happened?</small>
                    <h3>Register a new wound</h3>
                    <br />
                    <br />
                  </ClickableTile>
                  <ClickableTile
                    onClick={() => router.push("/dashboard/contact")}
                    style={{ width: "100%", height: 250 }}
                  >
                    <small>Get in touch with your Doctor</small>
                    <h3>Contact your doctor</h3>
                    <br />
                    <br />
                  </ClickableTile>
                  <ClickableTile
                    style={{ gridColumn: "span 2", width: "100%", height: 250 }}
                  >
                    <small>Get in touch with your Doctor</small>
                    <h3>Contact your doctor</h3>
                    <br />
                    <br />
                  </ClickableTile>
                </ArentGrid>
              </ArentGrid>
            </ArentFlex>
          </ArentFlex>
        </Container>
      </LayoutBase>
    );
  } else {
    return <ClientError>Something went wrong.</ClientError>;
  }
}
