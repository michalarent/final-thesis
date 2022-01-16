import {
  Button,
  FileUploaderDropContainer,
  Loading,
  TextInput,
  Tile,
} from "carbon-components-react";
import { useS3Upload } from "next-s3-upload";
import dynamic from "next/dynamic";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { RectangleSelector } from "react-image-annotation/lib/selectors";
import apiCall from "../../../../common/api/ApiCall";
import AnnotateImageModal from "../../../../components/AnnotateImageModal";
import ChatBox from "../../../../components/ChatBox";
import { Avatar } from "../../../../components/DoctorCard";
import ImageCard, {
  ImageCardContainer,
} from "../../../../components/ImageCard";
import { Container } from "../../../../components/ui/Container";
import LayoutBase from "../../../../components/ui/navigation/layout";
import {
  ArentFlex,
  ArentGrid,
} from "../../../../components/ui/navigation/layout/ArentGrid";
import WoundSlider from "../../../../components/WoundSlider";
import { useUser } from "../../../../hooks/user";
import usePatientInfo from "../../../../hooks/user/usePatientInfo";
import { colors } from "../../../../theme/colors";
import appointment from "../../../api/appointment";
import wound from "../../../api/patient/wound";

export default function EditAppointment() {
  const user = useUser();
  const { basics, patientData, doctorData } = usePatientInfo();
  const [appointment, setAppointment] = useState(null);
  const { appointmentId } = router.isReady && router.query;
  const [removedUrls, setRemovedUrls] = useState([]);
  const [addedUrls, setAddedUrls] = useState([]);
  const [currentImage, setCurrentImage] = useState<any>();
  const [openAnnotationModal, setOpenAnnotationModal] = useState(false);
  const { uploadToS3 } = useS3Upload();

  console.log(appointmentId);
  const [currentAnnotation, setCurrentAnnotation] = useState({});
  const [annotations, setAnnotations] = useState([]);
  const [annotationType, setAnnotationType] = useState("RECTANGLE");

  async function assignAppointment() {
    if (!appointmentId) return null;
    else {
      const _appointment = await apiCall(
        `/api/appointment/${appointmentId}`,
        "GET"
      );
      if (_appointment.appointment) {
        setAppointment(_appointment);
      }
    }
  }

  console.log(appointment);

  useEffect(() => {
    if (!appointmentId) return null;
    else {
      assignAppointment();
    }
  }, [appointmentId]);

  if (!appointment) {
    return <Loading />;
  }

  const onSubmit = () => {
    console.log("SUBMIT");
  };

  const onAddFile = async (files) => {
    const urls = [];

    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const { url } = await uploadToS3(file);
      const response = await apiCall("/api/appointment/images/add", "POST", {
        appointmentId: appointment.appointment.id,
        imageUrl: url,
      });
      console.log(response);
      urls.push(response);
    }
    setAddedUrls([...addedUrls, ...urls]);
    console.log(addedUrls);

    return urls;
  };

  const onDelete = async (file) => {
    setRemovedUrls([...removedUrls, file]);
    const response = await apiCall("/api/appointment/images/delete", "DELETE", {
      appointmentId: appointment.appointment.id,
      imageUrl: file,
    });
  };

  return (
    <LayoutBase
      title="Your Appointments"
      breadcrumbs={["Dashboard", "Appointments"]}
    >
      <AnnotateImageModal
        onClose={() => setOpenAnnotationModal(false)}
        image={currentImage}
        visible={openAnnotationModal}
      />
      <Container>
        <ArentFlex direction="column" width="100%" gap={50}>
          <h2 style={{ marginBottom: -30 }}>Meeting Information</h2>
          <ArentGrid columns="1fr " gap={20}>
            <Tile style={{ width: "100%", height: 250 }}>
              <ArentGrid
                style={{ height: "100%" }}
                justify="start"
                align="center"
                columns="auto 1fr"
                gap={30}
              >
                <Avatar src="https://thispersondoesnotexist.com/image" />
                <ArentFlex direction="column" gap={10}>
                  <small>
                    Consultation for{" "}
                    <b>{appointment.wound.woundLocation} wound</b> treatment{" "}
                  </small>
                  <h3>{appointment.doctor.name}</h3>
                  <h4>
                    {appointment.doctor.doctorData.specialization.label} |{" "}
                    {appointment.doctor.doctorData.country}
                  </h4>
                  <ArentGrid
                    align="center"
                    columns="auto 1fr"
                    gap={30}
                    justify="start"
                  >
                    <h5>Time</h5>
                    <h4>
                      {new Date(appointment.appointment.date).toLocaleString()}
                    </h4>
                  </ArentGrid>
                </ArentFlex>
              </ArentGrid>
              {/* <small>
                Consultation for <b>{currentWound.woundLocation} wound</b>{" "}
                treatment{" "}
              </small> */}
            </Tile>
          </ArentGrid>
          <h2 style={{ marginBottom: -30 }}>Images</h2>
          <p style={{ marginBottom: -30 }}>
            Are your images clear? Or perhaps there's something that you would
            like to highlight on the image? Access the context menu in the
            top-right corner of the image to annotate it.
          </p>
          <WoundSlider
            cards={[
              ...appointment.images
                .concat(addedUrls)
                .filter((img) => !removedUrls.includes(img.url))
                .map((img) => (
                  <ImageCard
                    onStartAnnotate={() => {
                      setCurrentImage(img);
                      setOpenAnnotationModal(true);
                    }}
                    onDelete={() => onDelete(img.url)}
                    src={img.url}
                  />
                )),
              <ImageCardContainer>
                <ArentFlex
                  width="100%"
                  height="100%"
                  align="center"
                  justify="center"
                  direction="column"
                  gap={20}
                >
                  <IoAdd size="50px" />
                  <FileUploaderDropContainer
                    multiple
                    accept={[".jpg", ".png"]}
                    labelText="Drag and drop"
                    onAddFiles={(_, { addedFiles }) => {
                      onAddFile(addedFiles);
                    }}
                    style={{ width: "100%" }}
                    // name={field.value}
                  />
                </ArentFlex>
              </ImageCardContainer>,
            ]}
            type={"solana"}
          />
          <h2 style={{ marginBottom: -30 }}>Messages</h2>
          <p style={{ marginBottom: -30 }}>
            Leave your doctor a message to let them know what you think.
          </p>
          {doctorData &&
          doctorData.status === "ready" &&
          doctorData.value.isDoctor &&
          patientData.status === "ready" &&
          !patientData.value.isPatient ? (
            <ChatBox
              sender={user.authId}
              receiver={
                doctorData.value.doctor.appointments.find(
                  (app) => app.id == appointmentId
                ).wound.patient.authId
              }
              messages={undefined}
              onSendMessage={undefined}
            />
          ) : (
            <ChatBox
              sender={user.authId}
              receiver={appointment.doctor.authId}
              messages={[]}
              onSendMessage={() => {
                console.log("SEND MESSAGE");
              }}
            />
          )}
        </ArentFlex>
      </Container>
    </LayoutBase>
  );
}
