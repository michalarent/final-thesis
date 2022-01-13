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
import { useState } from "react";
import { Container } from "./ui/Container";
import styled from "styled-components";
import { DeleteIcon } from "./WoundCard";

const ModalContainer = styled.div`
  & .bx--modal-container {
    background: white;
    width: 95vw !important;
    height: 95vh !important;
  }
`;

const Annotation = dynamic(() => import("react-image-annotation"), {
  ssr: false,
  loading: () => <Loading />,
});
export default function AnnotateImageModal({ visible, url, onClose }) {
  const [annotationType, setAnnotationType] = useState(OvalSelector.TYPE);
  const [currentAnnotation, setCurrentAnnotation] = useState({});
  const [annotations, setAnnotations] = useState([]);
  return (
    <ModalContainer>
      <Modal
        style={{ width: "100%", height: "100%" }}
        passiveModal
        open={visible}
        onRequestClose={onClose}
      >
        <ArentFlex
          style={{ overflow: "visible" }}
          direction="column"
          width="100%"
          height="100%"
          align="center"
          justify="center"
        >
          <div
            style={{
              width: "80%",
              objectFit: "cover",
              overflow: "visible",
              position: "relative",
              zIndex: 10,
            }}
          >
            <DeleteIcon style={{ zIndex: 50 }}>
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
            </DeleteIcon>
            <Annotation
              src={url}
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
          </div>
          <ArentFlex gap={20}>
            <Button onClick={() => setAnnotations([])}>Remove All</Button>
            <Button>Submit</Button>
          </ArentFlex>
        </ArentFlex>
      </Modal>
    </ModalContainer>
  );
}
