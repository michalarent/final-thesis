import { Button, Link, Loading, Tab, Tabs } from "carbon-components-react";
import { DateTime } from "luxon";
import { useRouter } from "next/router";
import { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import apiCall from "../../../../common/api/ApiCall";
import AnnotateImageModal from "../../../../components/AnnotateImageModal";
import ChatBox from "../../../../components/ChatBox";
import DoctorExaminationsTab from "../../../../components/examination/DoctorExaminationsTab";
import ExaminationItem from "../../../../components/examination/ExaminationItem";
import PatientExaminationsTab from "../../../../components/examination/PatientExaminationsTab";
import { modalStyles } from "../../../../components/modal_styles";
import ModifiableCalendar from "../../../../components/treatment/calendar/ModifiableCalendar";
import MedicationsListWithAdd from "../../../../components/treatment/MedicationsListWithAdd";
import NewTimelineEvent from "../../../../components/treatment/timeline/NewEvent";
import TreatmentImagesTab from "../../../../components/treatment/TreatmentImagesTab";
import TreatmentPatientCard from "../../../../components/treatment/TreatmentPatientCard";
import {
  ArentFlex,
  ArentGrid,
} from "../../../../components/ui/navigation/layout/ArentGrid";
import Topbar from "../../../../components/ui/navigation/topbar";
import ClientError from "../../../../components/util/ClientError";
import ClientLoading from "../../../../components/util/ClientLoading";
import { Divider } from "../../../../components/util/Divider";
import ScheduledExaminationForm from "../../../../db/ScheduledExaminationForm";
import { getListOfAllEvents } from "../../../../helpers/doctor";
import useLoaderSWR, { Loader } from "../../../../hooks/useLoaderSWR";
import { ConsolidatedTreatment } from "../../../../hooks/user/types";
import usePatientInfo from "../../../../hooks/user/usePatientInfo";

async function getTreatmentData(id): Promise<ConsolidatedTreatment> {
  const res: ConsolidatedTreatment = await apiCall(
    `/api/treatment?id=${id}`,
    "GET"
  );
  return res;
}

export default function TreatmentPage() {
  const { basics } = usePatientInfo();
  const router = useRouter();
  const { treatmentId } = router.query;
  const treatmentData = useLoaderSWR(
    treatmentId && `${treatmentId}`,
    getTreatmentData
  );

  const scheduledExaminations: Loader<ScheduledExaminationForm[]> = useLoaderSWR(
    `${
      basics.status !== "ready" ? null : basics.value.user.authId
    }-scheduled-examinations`,
    async () => {
      return await apiCall(
        `/api/treatment/examinations?treatmentId=${treatmentId}`,
        "GET"
      );
    }
  );

  const [currentEvent, setCurrentEvent] = useState<any>();
  const [requestLoading, setRequestLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState<any>();
  const [openAnnotationModal, setOpenAnnotationModal] = useState(false);
  const [currentDate, setCurrentDate] = useState<DateTime>(DateTime.now());
  const [modalOpen, setModalOpen] = useState<any>();

  console.log(treatmentData);

  if (treatmentData.status === "loading" || basics.status === "loading") {
    return <ClientLoading />;
  }

  if (treatmentData.status === "error" || basics.status === "error") {
    return <ClientError>Error loading treatment</ClientError>;
  }

  const allEvents = getListOfAllEvents(treatmentData);

  async function handleRemoveTreatment() {
    const res = await apiCall(`/api/treatment?id=${treatmentId}`, "DELETE");

    router.push("/dashboard/doctor/treatments");
  }

  return (
    <>
      <Topbar title={"Hey"} />
      <div style={{ marginTop: 48, height: "100%" }}>
        {requestLoading && <Loading />}
        <Modal
          onRequestClose={() => setModalOpen(false)}
          style={modalStyles}
          isOpen={modalOpen}
        >
          <NewTimelineEvent
            setRequestLoading={setRequestLoading}
            treatmentId={treatmentId}
            currentDate={currentDate}
          />
        </Modal>
        <AnnotateImageModal
          image={currentImage}
          visible={openAnnotationModal}
          onClose={() => setOpenAnnotationModal(false)}
        />

        <div style={{ width: "100%", background: "#f4f4f4", height: "100%" }}>
          <ArentGrid align="start" columns="1fr 2fr" style={{ height: "100%" }}>
            <ArentFlex gap={20} direction="column" width="100%" justify="start">
              <TreatmentPatientCard
                isDoctor={basics.value.isDoctor}
                appointments={treatmentData.value.appointments}
                wound={treatmentData.value.wound}
              />
            </ArentFlex>
            <ArentFlex width="100%" height="100%" direction="column">
              <TabsWrapper>
                <Tabs type="container">
                  <Tab
                    style={{ width: "100%", height: "100%" }}
                    id="tab-1"
                    label="Medications"
                  >
                    <ArentFlex
                      height="calc(100% - 50px)"
                      direction="column"
                      width="100%"
                    >
                      <h3 style={{ margin: "20px 0" }}>
                        Medications
                        {basics.value.isDoctor && (
                          <Link>
                            <Button
                              style={{ marginLeft: 10 }}
                              onClick={() =>
                                router.push("/dashboard/medications")
                              }
                              size="small"
                            >
                              Add new medication
                            </Button>
                          </Link>
                        )}
                      </h3>
                      <MedicationsListWithAdd
                        isDoctor={basics.value.isDoctor}
                        treatmentId={treatmentId}
                        medications={treatmentData.value.treatmentMedications}
                      />
                    </ArentFlex>
                  </Tab>
                  <Tab id="tab-2" label="Timeline">
                    <ArentFlex
                      padding="20px"
                      direction="column"
                      width="100%"
                      gap={20}
                    >
                      <CalendarFullScreenWrapper>
                        <ModifiableCalendar
                          fullScreen
                          isDoctor={basics.value.isDoctor}
                          createdAt={treatmentData.value.createdAt}
                          allEvents={allEvents}
                          currentDate={currentDate}
                          setCurrentDate={setCurrentDate}
                          setCurrentEvent={setCurrentEvent}
                          setModalOpen={setModalOpen}
                          scheduledExaminations={scheduledExaminations}
                        />
                      </CalendarFullScreenWrapper>
                      <Link
                        style={{
                          width: "100%",
                          textAlign: "right",
                          justifySelf: "flex-end",
                        }}
                        href={`${treatmentId}/events`}
                      >
                        View Full-screen
                      </Link>
                    </ArentFlex>
                  </Tab>
                  <Tab id="tab-2" label="Chat">
                    <ArentFlex
                      width="100%"
                      height="calc(100% - 50px)"
                      align="flex-end"
                    >
                      <ChatBox
                        height={600}
                        sender={basics.value.user.authId}
                        receiver={
                          basics.value.isDoctor
                            ? treatmentData.value.wound.patient.authId
                            : treatmentData.value.doctor.authId
                        }
                      />
                    </ArentFlex>
                  </Tab>
                  <Tab id="tab-6" label="Examination">
                    {basics.value.isDoctor && (
                      <DoctorExaminationsTab
                        basics={basics.value}
                        treatmentId={treatmentId}
                      />
                    )}
                    {basics.value.isPatient && (
                      <PatientExaminationsTab
                        treatmentId={treatmentId}
                        basics={basics.value}
                      />
                    )}
                  </Tab>
                  <Tab id="tab-4" label="Images">
                    <TreatmentImagesTab treatmentId={treatmentId} />
                  </Tab>
                  {basics.value.isDoctor && (
                    <Tab id="tab-5" label="Settings">
                      <ArentFlex direction="column" padding="20px" gap={20}>
                        <h3>Settings</h3>
                        <Button onClick={() => handleRemoveTreatment()}>
                          Remove treatment
                        </Button>
                      </ArentFlex>
                    </Tab>
                  )}
                </Tabs>
              </TabsWrapper>
            </ArentFlex>
          </ArentGrid>
        </div>
      </div>
    </>
  );
}

const TabsWrapper = styled.div`
  width: 100%;
  height: 100%;
  & > div {
    width: 100%;
    padding: 0px;
  }
  & .bx--tab-content {
    & > div {
      animation: fadeIn 0.1s ease-in-out;
    }
    width: 100%;
    padding: 0;
    height: 100%;
  }
`;

const CalendarFullScreenWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 208px);
  & .react-calendar,
  .react-calendar__viewContainer,
  .react-calendar__month-view {
    // height: calc(100vh - 48px) !important;
  }
  & .react-calendar__month-view__days {
    height: calc(100vh - 288px) !important;
  }
  & > div {
    height: calc(100vh - 288px) !important;
  }
`;
