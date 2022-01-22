import { DateTime } from "luxon";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import apiCall from "../../../../../common/api/ApiCall";
import ModifiableCalendar from "../../../../../components/treatment/calendar/ModifiableCalendar";
import Timeline from "../../../../../components/treatment/Timeline";
import {
  ArentFlex,
  ArentGrid,
} from "../../../../../components/ui/navigation/layout/ArentGrid";
import Topbar from "../../../../../components/ui/navigation/topbar";
import ClientError from "../../../../../components/util/ClientError";
import ClientLoading from "../../../../../components/util/ClientLoading";
import { getListOfAllEvents } from "../../../../../helpers/doctor";
import useLoaderSWR from "../../../../../hooks/useLoaderSWR";
import { ConsolidatedTreatment } from "../../../../../hooks/user/types";
import usePatientInfo from "../../../../../hooks/user/usePatientInfo";
import Modal from "react-modal";
import { modalStyles } from "../../../../../components/modal_styles";
import NewTimelineEvent from "../../../../../components/treatment/timeline/NewEvent";
import { Button, Loading, ToastNotification } from "carbon-components-react";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";

async function getTreatmentData(id): Promise<ConsolidatedTreatment> {
  const res: ConsolidatedTreatment = await apiCall(
    `/api/treatment?id=${id}`,
    "GET"
  );
  return res;
}

export default function EventsPage() {
  const { basics } = usePatientInfo();
  const router = useRouter();
  const { treatmentId } = router.query;
  const treatmentData = useLoaderSWR(
    treatmentId && `${treatmentId}`,
    getTreatmentData
  );

  const [currentEvent, setCurrentEvent] = useState<any>();
  const [currentImage, setCurrentImage] = useState<any>();
  const [openAnnotationModal, setOpenAnnotationModal] = useState(false);
  const [currentDate, setCurrentDate] = useState<DateTime>(DateTime.now());
  const [modalOpen, setModalOpen] = useState<any>();
  const [requestLoading, setRequestLoading] = useState<boolean>(false);

  console.log(treatmentData);

  if (treatmentData.status === "loading" || basics.status === "loading") {
    return <ClientLoading />;
  }

  if (treatmentData.status === "error" || basics.status === "error") {
    return <ClientError>Error loading treatment</ClientError>;
  }

  const allEvents = getListOfAllEvents(treatmentData);

  return (
    <>
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
      <Topbar />
      {requestLoading && <Loading />}
      <ArentGrid
        align="start"
        style={{
          marginTop: 50,
          height: "calc(100vh - 50px)",
          position: "relative",
        }}
        gap={50}
        columns="2fr 1fr"
      >
        <CalendarFullScreenWrapper>
          <ModifiableCalendar
            allEvents={allEvents}
            setModalOpen={setModalOpen}
            setCurrentEvent={setCurrentEvent}
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            fullScreen
          />
        </CalendarFullScreenWrapper>
        <Timeline events={allEvents} />
        <Link href={`/dashboard/doctor/treatments/${treatmentId}`}>
          <Button style={{ position: "absolute", bottom: 50, right: 50 }}>
            <ArentFlex gap={5} align="center">
              {" "}
              <IoArrowBack /> Go Back{" "}
            </ArentFlex>
          </Button>
        </Link>
      </ArentGrid>
    </>
  );
}

const CalendarFullScreenWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 48px);
  & .react-calendar,
  .react-calendar__viewContainer,
  .react-calendar__month-view {
    // height: calc(100vh - 48px) !important;
  }
  & .react-calendar__month-view__days {
    height: calc(100vh - 158px) !important;
  }
  & > div {
    height: calc(100vh - 48px) !important;
  }
`;
