import {
  Button,
  Loading,
  Modal,
  ModalBody,
  OverflowMenu,
  OverflowMenuItem,
} from "carbon-components-react";
import dynamic from "next/dynamic";
import { ArentFlex } from "./ui/navigation/layout/ArentGrid";
import {
  PointSelector,
  RectangleSelector,
  OvalSelector,
} from "react-image-annotation/lib/selectors";
import { useEffect, useState } from "react";
import { Container } from "./ui/Container";
import styled from "styled-components";
import { DeleteIcon } from "./WoundCard";
import apiCall from "../common/api/ApiCall";

const ModalContainer = styled.div`
  & .bx--modal-container {
    background: white;
    width: 95vw !important;
    height: 95vh !important;
  }
`;

async function sendAnnotationsToBackend(imageId, annotations) {
  const response = await apiCall(
    "/api/appointment/images/annotations",
    "POST",
    {
      imageId,
      annotations,
    }
  );
}

async function removeAnnotationsFromBackend(imageId) {
  const response = await apiCall(
    "/api/appointment/images/annotations",
    "DELETE",
    {
      imageId,
    }
  );
}

const Annotation = dynamic(() => import("react-image-annotation"), {
  ssr: false,
  loading: () => <Loading />,
});

export default function AnnotateImageModal({ visible, image, onClose }) {
  const [annotationType, setAnnotationType] = useState(OvalSelector.TYPE);
  const [currentAnnotation, setCurrentAnnotation] = useState({});
  const [annotations, setAnnotations] = useState([]);
  const [annotationsLoading, setAnnotationsLoading] = useState(false);

  const [imageFromDb, setImageFromDb] = useState<any>();

  async function getAnnotationsForImage() {
    setAnnotationsLoading(true);
    const response = await apiCall(
      `/api/appointment/images/annotations?imageId=${image.id}`,
      "GET"
    );
    console.log("REsponse: ", response);
    if (response.data) {
      setAnnotations(response.data);
    }
    setAnnotationsLoading(false);
  }

  useEffect(() => {
    if (image && image.id) {
      getAnnotationsForImage();
    }
  }, [image, visible, onClose]);

  console.log(image);

  const handleClose = () => {
    setAnnotations([]);
    setCurrentAnnotation({});
    onClose();
  };

  const handleDelete = () => {
    setAnnotations([]);
    removeAnnotationsFromBackend(image.id);
    setCurrentAnnotation({});
  };

  if (!image) {
    return null;
  }
  return (
    <ModalContainer>
      <Modal
        style={{ width: "100%", height: "100%" }}
        passiveModal
        open={visible}
        onRequestClose={() => handleClose()}
      >
        <ArentFlex
          style={{ overflow: "visible" }}
          direction="column"
          width="100%"
          height="100%"
          align="center"
          justify="center"
          padding="50px"
        >
          <DeleteIcon style={{ zIndex: 50, right: 150, top: 50, width: 100 }}>
            <OverflowMenu>
              <OverflowMenuItem
                onClick={() => setAnnotationType(RectangleSelector.TYPE)}
                itemText="Rectangle Annotation"
              />
              <OverflowMenuItem
                onClick={() => setAnnotationType(OvalSelector.TYPE)}
                itemText="Oval Annotation"
              />
              <OverflowMenuItem
                onClick={() => setAnnotationType(PointSelector.TYPE)}
                itemText="Point Annotation"
              />
            </OverflowMenu>
            <ArentFlex direction="column" width="100%" gap={20}>
              <Button onClick={() => removeAnnotationsFromBackend(image.id)}>
                Remove All
              </Button>
              <Button
                disabled={!annotations.length}
                onClick={() => sendAnnotationsToBackend(image.id, annotations)}
              >
                Submit
              </Button>
            </ArentFlex>
          </DeleteIcon>
          <div
            style={{
              width: "80%",
              height: "100%",
              objectFit: "cover",
              overflow: "visible",
              position: "relative",
              zIndex: 10,
            }}
          >
            <div style={{ height: "100%" }}>
              {annotationsLoading ? (
                <Loading />
              ) : (
                <Annotation
                  src={image.url}
                  type={annotationType}
                  value={currentAnnotation}
                  annotations={annotations}
                  alt="Two pebbles anthropomorphized holding hands"
                  onChange={(annotation) => {
                    setCurrentAnnotation(annotation);
                  }}
                  onSubmit={(annotation) => {
                    setAnnotations([...annotations, annotation]);
                  }}
                />
              )}
            </div>
          </div>
        </ArentFlex>
      </Modal>
    </ModalContainer>
  );
}
