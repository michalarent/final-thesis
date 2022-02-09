import {
  Button,
  Header,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderName,
  Loading,
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
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { Container } from "./ui/Container";
import styled from "styled-components";
import { DeleteIcon } from "./WoundCard";
import apiCall from "../common/api/ApiCall";
import { modalStyles } from "./modal_styles";
import { BsPlusCircle, BsX } from "react-icons/bs";
import { BiCircle, BiRectangle } from "react-icons/bi";
import { FaRegDotCircle } from "react-icons/fa";

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

export default function AnnotateImageModal({
  visible,
  setVisible,
  image,
  onClose,
}) {
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
    if (visible) {
      if (response.data) {
        setAnnotations(response.data);
      }
    }
    setAnnotationsLoading(false);
  }

  useEffect(() => {
    setAnnotations([]);
  }, []);

  useEffect(() => {
    if (image && image.id) {
      getAnnotationsForImage();
    }
  }, [image]);

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
        preventScroll
        style={{
          content: {
            width: "95vw",
            height: "calc(95vh - 64px)",
            position: "fixed",
            top: "calc(64px + 2.5vh)",

            left: "2.5vw",
            overflow: "hidden",

            padding: 0,
            zIndex: 5,
          },
          overlay: {
            zIndex: 1000,
          },
        }}
        isOpen={visible}
        shouldCloseOnEsc={false}
        onRequestClose={() => handleClose()}
      >
        <Header style={{ position: "sticky" }}>
          <HeaderMenuItem
            style={{ height: "100%" }}
            isCurrentPage={annotationType === OvalSelector.TYPE}
            onClick={() => setAnnotationType(OvalSelector.TYPE)}
          >
            <ArentFlex
              direction="column"
              width="100%"
              height={"45px"}
              justify="center"
              align="center"
            >
              <BiCircle color="white" />
              <small style={{ fontSize: 10, margin: 0, lineHeight: 1 }}>
                Oval
              </small>
            </ArentFlex>
          </HeaderMenuItem>
          <HeaderMenuItem
            isCurrentPage={annotationType === RectangleSelector.TYPE}
            onClick={() => setAnnotationType(RectangleSelector.TYPE)}
          >
            <ArentFlex
              direction="column"
              width="100%"
              height={"45px"}
              justify="center"
              align="center"
            >
              <BiRectangle color="white" />
              <small style={{ fontSize: 10, margin: 0, lineHeight: 1 }}>
                Rectangle
              </small>
            </ArentFlex>
          </HeaderMenuItem>
          <HeaderMenuItem
            isCurrentPage={annotationType === PointSelector.TYPE}
            onClick={() => setAnnotationType(PointSelector.TYPE)}
          >
            <ArentFlex
              direction="column"
              width="100%"
              height={"45px"}
              justify="center"
              align="center"
            >
              <FaRegDotCircle color="white" />
              <small style={{ fontSize: 10, margin: 0, lineHeight: 1 }}>
                Point
              </small>
            </ArentFlex>
          </HeaderMenuItem>
          <HeaderGlobalBar>
            <HeaderGlobalAction
              aria-label="Remove All Annotations"
              style={{
                width: "fit-content",
                paddingRight: 20,
                paddingLeft: 20,
              }}
              onClick={() => removeAnnotationsFromBackend(image.id)}
            >
              Remove All
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="Submit"
              style={{
                width: "fit-content",
                paddingRight: 20,
                paddingLeft: 20,
              }}
              disabled={!annotations.length}
              onClick={() => sendAnnotationsToBackend(image.id, annotations)}
            >
              Submit
            </HeaderGlobalAction>
            <HeaderGlobalAction
              aria-label="Submit"
              style={{
                width: "fit-content",
                paddingRight: 20,
                paddingLeft: 20,
              }}
              onClick={() => {
                document.body.style.overflow = "auto";
                setVisible(false);
              }}
            >
              <BsX />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
        </Header>
        <ArentFlex
          direction="column"
          width="100%"
          align="center"
          justify="center"
          style={{ overflow: "visible" }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              overflow: "visible",
              zIndex: 10,
            }}
          >
            <div>
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
