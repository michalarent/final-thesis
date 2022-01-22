import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableExpandedRow,
  TableExpandRow,
  TableHeader,
  TableRow,
} from "carbon-components-react";
import { motion } from "framer-motion";
import router from "next/router";
import { useState } from "react";
import Modal from "react-modal";
import apiCall from "../../../../common/api/ApiCall";
import { getStandardDate } from "../../../../common/util/dates";
import ChatBox from "../../../../components/ChatBox";
import MedicalHistoryTable from "../../../../components/patient/MedicalHIstoryTable";
import { Container } from "../../../../components/ui/Container";
import LayoutBase from "../../../../components/ui/navigation/layout";
import ClientError from "../../../../components/util/ClientError";
import ClientLoading from "../../../../components/util/ClientLoading";
import Patient from "../../../../db/Patient";
import usePatientInfo from "../../../../hooks/user/usePatientInfo";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    width: "50vw",
    height: " auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

DoctorPatientsPage.getInitialProps = async ({ query }) => {
  const { highlight } = query;
  return { highlight };
};

export default function DoctorPatientsPage({ highlight }) {
  const { basics, doctorData, patientData } = usePatientInfo();
  const [selectedPatient, setSelectedPatient] = useState<Partial<Patient>>(
    null
  );

  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [openChatModal, setOpenChatModal] = useState(false);
  const [openMedicalRecordModal, setOpenMedicalRecordModal] = useState(false);

  if (basics.status === "loading" || doctorData.status === "loading") {
    return <ClientLoading />;
  }

  if (basics.status === "error" || doctorData.status === "error") {
    return <ClientError>Error loading doctor's data</ClientError>;
  }

  console.log(highlight);

  const patients = doctorData.value.doctor.patients;

  const headers = [
    {
      key: "expand",
      header: "",
    },
    {
      key: "id",
      header: "ID",
    },
    {
      key: "name",
      header: "Name",
    },
    {
      key: "email",
      header: "Email",
    },
  ];

  if (basics.status === "ready" && doctorData.status === "ready") {
    return (
      <>
        <Modal
          isOpen={openChatModal}
          passiveModal
          style={customStyles}
          onRequestClose={() => {
            setOpenChatModal(false);
            setSelectedPatient(null);
          }}
        >
          <Container>
            {selectedPatient && (
              <>
                <h3 style={{ textAlign: "left", marginBottom: "1rem" }}>
                  {selectedPatient.medicalHistory.firstName +
                    " " +
                    selectedPatient.medicalHistory.lastName}
                </h3>
                <ChatBox
                  sender={basics.value.user.authId}
                  receiver={selectedPatient.authId}
                />
              </>
            )}
          </Container>
        </Modal>
        <Modal
          isOpen={openMedicalRecordModal}
          style={customStyles}
          onRequestClose={() => {
            setOpenMedicalRecordModal(false);
            setSelectedPatient(null);
          }}
        >
          {selectedPatient && (
            <MedicalHistoryTable
              medicalHistory={selectedPatient.medicalHistory}
            />
          )}
        </Modal>
        <LayoutBase title={"Patients"} breadcrumbs={["Dashboard", "Patients"]}>
          <Container>
            <TableContainer
              title="All Patients Under Your Control"
              description="List of all patients who have been added to your control"
            >
              <Table size="xl">
                <TableRow>
                  {headers.map((header) => (
                    <>
                      <TableHeader>{header.header}</TableHeader>
                    </>
                  ))}
                  <TableHeader colSpan={2}>Actions</TableHeader>
                </TableRow>
                <TableBody>
                  {doctorData.value.doctor.patients.map(
                    (row, index) => (
                      console.log(row),
                      (
                        <>
                          <TableRow
                            isSelected={highlight === row.patient.authId}
                          >
                            <>
                              <TableCell
                                onClick={() => {
                                  if (expandedRows.includes(index)) {
                                    setExpandedRows(
                                      expandedRows.filter((i) => i !== index)
                                    );
                                  } else {
                                    setExpandedRows([...expandedRows, index]);
                                  }
                                }}
                              >
                                Expand
                              </TableCell>
                              <TableCell>{row.patient.authId}</TableCell>
                              <TableCell>
                                {row.patient.medicalHistory.firstName +
                                  " " +
                                  row.patient.medicalHistory.lastName}
                              </TableCell>
                              <TableCell>{row.patient.email}</TableCell>
                            </>

                            <TableCell key="remove-button">
                              <Button
                                size="small"
                                onClick={() => {
                                  setSelectedPatient(row.patient);
                                  setOpenChatModal(true);
                                }}
                              >
                                Go to chat
                              </Button>
                            </TableCell>
                            <TableCell key="edit-button">
                              <Button
                                size="small"
                                onClick={() => {
                                  setSelectedPatient(row.patient);
                                  setOpenMedicalRecordModal(true);
                                }}
                              >
                                View medical history
                              </Button>
                            </TableCell>
                          </TableRow>

                          {expandedRows.includes(index) && (
                            <TableCell colSpan={6}>
                              <motion.div
                                initial={{ height: "0px" }}
                                animate={{ height: "100%" }}
                                exit={{ height: "0px" }}
                                transition={{ duration: 0.1 }}
                              >
                                <TableContainer title="All Appointments of the patient with you">
                                  <Table>
                                    {row.appointments.map(
                                      (app) =>
                                        app.wound &&
                                        app.wound.woundData && (
                                          <TableRow>
                                            {console.log(
                                              app.wound.woundData.woundLocation
                                            )}
                                            <TableCell>{app.id}</TableCell>
                                            <TableCell>
                                              {getStandardDate(app.date)}
                                            </TableCell>
                                            <TableCell>
                                              {
                                                app.wound.woundData
                                                  .woundSeverity
                                              }{" "}
                                              severity
                                            </TableCell>
                                            <TableCell>
                                              {app.wound.woundData.woundSize}{" "}
                                              size
                                            </TableCell>
                                            <TableCell>
                                              {app.wound.woundData.woundType}{" "}
                                              type
                                            </TableCell>
                                            <TableCell>
                                              {
                                                app.wound.woundData
                                                  .woundLocation
                                              }{" "}
                                              wound
                                            </TableCell>
                                            <Button
                                              onClick={() => {
                                                console.log(app.id);
                                                requestRemoveAppointment(
                                                  app.id
                                                );
                                              }}
                                              size="field"
                                              disabled={
                                                new Date(app.date).getTime() <
                                                Date.now()
                                              }
                                            >
                                              Cancel
                                            </Button>
                                          </TableRow>
                                        )
                                    )}
                                  </Table>
                                </TableContainer>
                              </motion.div>
                            </TableCell>
                          )}
                        </>
                      )
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </LayoutBase>
      </>
    );
  }
}

async function requestRemoveAppointment(appointmentId) {
  const response = apiCall("/api/appointment", "DELETE", {
    appointmentId,
  });
  return response;
}
