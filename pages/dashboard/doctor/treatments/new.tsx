import {
  Button,
  NumberInput,
  SkeletonPlaceholder,
  StructuredListBody,
  StructuredListCell,
  StructuredListHead,
  StructuredListInput,
  StructuredListRow,
  StructuredListWrapper,
  Tile,
} from "carbon-components-react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import apiCall from "../../../../common/api/ApiCall";
import MedicalHistoryTable from "../../../../components/patient/MedicalHIstoryTable";
import { Container } from "../../../../components/ui/Container";
import LayoutBase from "../../../../components/ui/navigation/layout";
import {
  ArentFlex,
  ArentGrid,
} from "../../../../components/ui/navigation/layout/ArentGrid";
import { Scrollable } from "../../../../components/ui/Scrollable";
import ClientError from "../../../../components/util/ClientError";
import ClientLoading from "../../../../components/util/ClientLoading";
import WoundDataList from "../../../../components/wound/WoundDataList";
import WoundSlider from "../../../../components/WoundSlider";
import Image from "../../../../db/Image";
import Patient from "../../../../db/Patient";
import { ConsolidatedAppointment } from "../../../../helpers/doctor/types";
import useLoaderSWR from "../../../../hooks/useLoaderSWR";
import useMedications from "../../../../hooks/useMedications";
import { ConsolidatedWound } from "../../../../hooks/user/types";
import useUserInfo from "../../../../hooks/user/usePatientInfo";
import { CheckmarkFilled16 } from "@carbon/icons-react";
import { MedicationType } from "../../../../types/medication";

async function createTreatment(doctorId, woundId, medications) {
  const response = await apiCall("/api/doctor/treatment", "POST", {
    doctorId,
    woundId,
    medications,
  });
}

async function fetchPatientWounds(
  patientId: string
): Promise<ConsolidatedWound[]> {
  return await apiCall(`/api/patient/wound?user=${patientId}`, "GET");
}

export default function NewTreatmentPage() {
  const { basics, patientData, doctorData } = useUserInfo();
  const router = useRouter();

  const [currentPatient, setCurrentPatient] = useState<{
    patient: Patient;
    appointments: ConsolidatedAppointment[];
  }>(null);

  const medications = useMedications();
  const [currentWound, setCurrentWound] = useState<ConsolidatedWound>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedMedications, setSelectedMedications] = useState<
    { medication: MedicationType; dosage: number }[]
  >([]);
  const [dosages, setDosages] = useState<{ id: number; dosage: number }>(null);

  const currentWounds = useLoaderSWR(
    currentPatient && currentPatient.patient.authId,
    fetchPatientWounds
  );

  const basicsReady = basics.status === "ready";
  const patientDataReady = basicsReady && patientData.status === "ready";
  const doctorDataReady = basicsReady && doctorData.status === "ready";

  const ready = basicsReady && patientDataReady && doctorDataReady;
  const error =
    basics.status === "error" ||
    patientData.status === "error" ||
    doctorData.status === "error";

  useEffect(() => {
    setCurrentWound(null);
  }, [currentPatient]);

  useEffect(() => {
    if (currentStep === 1) {
      if (!currentWound || !currentPatient) {
        setCurrentStep(0);
      }
    }
  }, [currentWound, currentPatient]);

  if (!ready) {
    return <ClientLoading />;
  }

  if (error) {
    return <ClientError>Something went wrong</ClientError>;
  }

  if (doctorData.status === "ready") {
    const { treatments, patients } = doctorData.value.doctor;
    console.log(patients);

    return (
      <LayoutBase title="Treatments" breadcrumbs={["Dashboard", "New"]}>
        <ArentGrid align="start" columns="2fr 1fr" width="100%" gap={20}>
          <ArentFlex direction="column" width="100%" padding="0px 50px">
            <h2>01 Select Patient</h2>
            <Tile style={{ width: "100%" }}>
              <WoundSlider
                cards={patients.map((p) => (
                  <SelectPatientContainer selected={currentPatient === p}>
                    <Scrollable
                      height="200px"
                      style={{
                        width: "100%",
                        borderRadius: "20px 20px 0 0",
                      }}
                    >
                      <MedicalHistoryTable
                        size="compact"
                        medicalHistory={p.patient.medicalHistory}
                      />
                    </Scrollable>
                    {currentPatient === p ? (
                      <Button
                        style={{
                          width: "100%",
                          background: "black",
                          color: "white",
                        }}
                        onClick={() => {
                          setCurrentWound(null);
                          setCurrentPatient(null);
                        }}
                      >
                        Deselect
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setCurrentPatient(p)}
                        style={{
                          width: "100%",
                          background: "black",
                          color: "white",
                        }}
                      >
                        Select patient
                      </Button>
                    )}
                  </SelectPatientContainer>
                ))}
              />
            </Tile>
            <h2 style={{ marginTop: 20 }}>02 Select Wound for treatment</h2>

            {currentWounds.status === "ready" ? (
              <motion.div
                style={{ width: "100%" }}
                initial={{ height: 0, y: 50, opacity: 0 }}
                animate={{ height: "100%", y: 0, opacity: 1 }}
              >
                <Tile>
                  <WoundSlider
                    cards={
                      currentPatient &&
                      currentWounds.value.map((p) => (
                        <SelectPatientContainer selected={currentWound === p}>
                          <Scrollable height="200px">
                            <WoundDataList wound={p} />
                          </Scrollable>
                          {currentWound === p ? (
                            <Button
                              style={{
                                width: "100%",
                                background: "black",
                                color: "white",
                              }}
                              onClick={() => setCurrentWound(null)}
                            >
                              Deselect
                            </Button>
                          ) : (
                            <Button
                              onClick={() => setCurrentWound(p)}
                              style={{
                                width: "100%",
                                background: "black",
                                color: "white",
                              }}
                            >
                              Select Wound
                            </Button>
                          )}
                        </SelectPatientContainer>
                      ))
                    }
                  />
                </Tile>
              </motion.div>
            ) : (
              <Tile style={{ width: "100%", height: 300 }} />
            )}
            <h2 style={{ marginTop: 20 }}>
              03 Select Medications and doses for treatment
            </h2>
            {medications.status === "ready" ? (
              <motion.div
                style={{ width: "100%" }}
                initial={{ height: 0, y: 50, opacity: 0 }}
                animate={{ height: "100%", y: 0, opacity: 1 }}
              >
                <StructuredListWrapper>
                  <StructuredListHead>
                    <StructuredListRow head>
                      <StructuredListCell head>Name</StructuredListCell>
                      <StructuredListCell head>Description</StructuredListCell>
                      <StructuredListCell head>Type</StructuredListCell>
                      <StructuredListCell head>Dosage</StructuredListCell>
                      <StructuredListCell head>{""}</StructuredListCell>
                    </StructuredListRow>
                  </StructuredListHead>
                  <StructuredListBody>
                    {medications.value.map((m, index) => (
                      <StructuredListRow key={m.id}>
                        <StructuredListCell>{m.name}</StructuredListCell>
                        <StructuredListCell>{m.description}</StructuredListCell>
                        <StructuredListCell>{m.type}</StructuredListCell>
                        <StructuredListCell style={{ width: 200 }}>
                          <NumberInput
                            value={(dosages && dosages[m.id]) || 0}
                            onChange={(e) => {
                              setDosages(
                                dosages && dosages[m.id]
                                  ? {
                                      ...dosages,
                                      [m.id]: parseInt(e.imaginaryTarget.value),
                                    }
                                  : {
                                      ...dosages,
                                      [m.id]: parseInt(e.imaginaryTarget.value),
                                    }
                              );
                            }}
                            id={`dosage-${m.name}`}
                            min={0}
                            max={100}
                          />
                        </StructuredListCell>

                        <StructuredListCell>
                          {selectedMedications.find(
                            (_m) => m === _m.medication
                          ) ? (
                            <Button
                              size="small"
                              style={{
                                background: "black",
                                color: "white",
                              }}
                              onClick={() => {
                                setSelectedMedications(
                                  selectedMedications.filter(
                                    (m2) => m2.medication.id !== m.id
                                  )
                                );
                              }}
                            >
                              Deselect
                            </Button>
                          ) : (
                            <Button
                              size="small"
                              disabled={dosages && dosages[m.id] === 0}
                              onClick={() => {
                                setSelectedMedications([
                                  ...selectedMedications,
                                  {
                                    medication: m,
                                    dosage: dosages[m.id],
                                  },
                                ]);
                              }}
                              style={{
                                background: "black",
                                color: "white",
                              }}
                            >
                              Select
                            </Button>
                          )}
                        </StructuredListCell>
                      </StructuredListRow>
                    ))}
                  </StructuredListBody>
                </StructuredListWrapper>
              </motion.div>
            ) : (
              <Tile style={{ width: "100%" }} />
            )}
          </ArentFlex>
          {console.log(dosages)}
          <ArentFlex
            direction="column"
            gap={20}
            width="100%"
            style={{ position: "sticky", top: 100, right: 0 }}
          >
            {currentPatient ? (
              <Scrollable height="250px" style={{ width: "100%" }}>
                <MedicalHistoryTable
                  size="compact"
                  medicalHistory={currentPatient.patient.medicalHistory}
                />
              </Scrollable>
            ) : (
              <Tile style={{ width: "100%", height: 250 }} />
            )}
            {currentWound ? (
              <div style={{ width: "100%" }}>
                {" "}
                <WoundDataList wound={currentWound} />
              </div>
            ) : (
              <Tile style={{ width: "100%", height: 250 }} />
            )}
            {selectedMedications.length > 0 ? (
              <Scrollable height="350px" style={{ width: "100%" }}>
                <StructuredListWrapper>
                  <StructuredListHead>
                    <StructuredListRow head>
                      <StructuredListCell head>Name</StructuredListCell>
                      <StructuredListCell head>Description</StructuredListCell>
                      <StructuredListCell head>Type</StructuredListCell>
                      <StructuredListCell head>Dosage</StructuredListCell>
                      <StructuredListCell head>{""}</StructuredListCell>
                    </StructuredListRow>
                  </StructuredListHead>
                  <StructuredListBody>
                    {selectedMedications.map((m, index) => (
                      <StructuredListRow key={index}>
                        <StructuredListCell>
                          {m.medication.name}
                        </StructuredListCell>
                        <StructuredListCell>
                          {m.medication.description}
                        </StructuredListCell>
                        <StructuredListCell>
                          {m.medication.type}
                        </StructuredListCell>
                        <StructuredListCell style={{ width: 200 }}>
                          {m.dosage}
                        </StructuredListCell>
                      </StructuredListRow>
                    ))}
                  </StructuredListBody>
                </StructuredListWrapper>
              </Scrollable>
            ) : (
              <Tile style={{ width: "100%", height: 200 }} />
            )}
            {currentWound && currentPatient && (
              <Button
                style={{
                  color: "white",
                  background: "black",
                  width: "100%",
                }}
                onClick={() => {
                  createTreatment(
                    basics.value.user.authId,
                    currentWound.woundId,
                    selectedMedications
                  );
                }}
              >
                Submit
              </Button>
            )}
          </ArentFlex>
        </ArentGrid>
      </LayoutBase>
    );
  }
}

const SelectPatientContainer = styled.div<{ selected: boolean }>`
  width: 100%;
  background: white;
  padding: 10px;
  display: flex;
  flex-direction: column;

  height: 300px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;

  transition: all 0.1s ease-in-out;

  ${(props) =>
    props.selected &&
    `
        background: black;
        color: white;
        `}
`;

const SelectImageContainer = styled.div<{ selected: boolean }>`
  width: 100%;
  background: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  transition: all 0.1s ease-in-out;
  ${(props) =>
    props.selected &&
    `
        background: black;
        color: white;
        `}
`;
