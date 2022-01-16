import {
  Button,
  ClickableTile,
  Loading,
  Modal,
  Tile,
} from "carbon-components-react";
import router from "next/router";
import React, { useState } from "react";
import DoctorCard from "../../components/DoctorCard";
import { Container } from "../../components/ui/Container";
import LayoutBase from "../../components/ui/navigation/layout";
import {
  ArentFlex,
  ArentGrid,
} from "../../components/ui/navigation/layout/ArentGrid";
import { WoundCard } from "../../components/WoundCard";
import WoundSlider from "../../components/WoundSlider";
import { useDoctors } from "../../hooks/user";
import { deleteWoundFromBackend } from "../../hooks/user/helpers";
import { ConsolidatedWound } from "../../hooks/user/types";
import useUserInfo from "../../hooks/user/usePatientInfo";
import { colors } from "../../theme/colors";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [currentWound, setCurrentWound] = useState<ConsolidatedWound>();
  const { basics, patientData, doctorData } = useUserInfo();

  const basicsReady = basics.status === "ready";
  const patientDataReady = basicsReady && patientData.status === "ready";
  const doctorDataReady = basicsReady && doctorData.status === "ready";

  const allDoctors = useDoctors();
  console.log("all doctors", allDoctors);

  const ready = basicsReady && patientDataReady && doctorDataReady;
  console.log("Consolidated patient info", patientData);
  console.log("Doctor data:", doctorData);

  if (!ready) {
    return <Loading />;
  }

  if (ready && !patientData.value.isPatient && doctorData.value.isDoctor) {
    return (
      <LayoutBase title="Doctor's Dashboard" breadcrumbs={["Dashboard"]}>
        <Container>
          <ArentFlex direction="column" height="100%" width="100%" gap={20}>
            <Tile>
              <WoundSlider
                cards={doctorData.value.doctor.appointments.map((app) => {
                  return (
                    <div>
                      <ArentFlex direction="column" gap={10} height="100%">
                        <Button
                          onClick={() =>
                            router.push(
                              `/dashboard/appointments/edit/${app.id}`
                            )
                          }
                        >
                          Go to appointment details
                        </Button>
                        <div>{app.date}</div>
                        <div>Images sent: {app.images.length}</div>
                        <div>Patient email: {app.wound.patient.email}</div>
                        <div>
                          Patient declared name:{" "}
                          {app.wound.patient.medicalHistory.firstName}{" "}
                          {app.wound.patient.medicalHistory.lastName}
                        </div>
                        <div>
                          Patient country:{" "}
                          {app.wound.patient.medicalHistory.country}{" "}
                        </div>
                        <div>
                          {" "}
                          Gender: {app.wound.patient.medicalHistory.gender}
                        </div>
                        <div>
                          {" "}
                          Allergies:{" "}
                          {app.wound.patient.medicalHistory.allergies
                            ? app.wound.patient.medicalHistory.allergies.map(
                                (al) => <span>{al} </span>
                              )
                            : "None"}
                        </div>

                        <div>
                          {" "}
                          Medications:{" "}
                          {app.wound.patient.medicalHistory.medications
                            ? app.wound.patient.medicalHistory.medications.map(
                                (al) => <span>{al} </span>
                              )
                            : "None"}
                        </div>
                        <div>
                          {" "}
                          Blood type:{" "}
                          {app.wound.patient.medicalHistory.bloodType
                            ? app.wound.patient.medicalHistory.bloodType
                            : "Not provided"}
                        </div>
                        <div>
                          {" "}
                          Smoker?{" "}
                          {app.wound.patient.medicalHistory.isSmoker
                            ? "Yes"
                            : "No"}
                        </div>
                        <div>
                          {" "}
                          Diabetic?{" "}
                          {app.wound.patient.medicalHistory.isDiabetic
                            ? "Yes"
                            : "No"}
                        </div>
                        <div>
                          {" "}
                          Alcoholic?{" "}
                          {app.wound.patient.medicalHistory.isAlcoholic
                            ? "Yes"
                            : "No"}
                        </div>
                      </ArentFlex>
                    </div>
                  );
                })}
              ></WoundSlider>
            </Tile>
          </ArentFlex>
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
                user={basics.value.user}
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
                cards={patientData.value.patient.wounds.map((wound, index) => {
                  return (
                    <WoundCard
                      setCurrentWound={setCurrentWound}
                      wound={wound}
                      setShowModal={setShowModal}
                      appointments={wound.appointments}
                      onDelete={() =>
                        deleteWoundFromBackend(
                          basics.value.user.authId,
                          wound.woundId
                        )
                      }
                    ></WoundCard>
                  );
                })}
                type={"solana"}
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
                    <small>Messages</small>
                    <h3>No new messages</h3>
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
                  <ClickableTile style={{ width: "100%", height: 250 }}>
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
  }
}
