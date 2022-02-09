import {
  InlineLoading,
  OverflowMenu,
  OverflowMenuItem,
} from "carbon-components-react";
import { useEffect, useState } from "react";
import apiCall from "../../common/api/ApiCall";
import Image from "../../db/Image";
import useLoaderSWR, { Loader } from "../../hooks/useLoaderSWR";
import AnnotateImageModal from "../AnnotateImageModal";
import { ArentGrid } from "../ui/navigation/layout/ArentGrid";

export default function TreatmentImagesTab({ treatmentId }) {
  const [annotateModal, setAnnotateModal] = useState(false);
  const [currentImage, setCurrentImage] = useState<Image>();

  const images: Loader<Image[]> = useLoaderSWR(
    `images-${treatmentId}`,
    async () => {
      return await apiCall(
        `/api/appointment/images/multi?treatmentId=${treatmentId}`,
        "GET"
      );
    }
  );

  if (images.status === "loading") {
    return <InlineLoading />;
  }

  if (images.status === "error") {
    return <InlineLoading />;
  }

  console.log(images);

  return (
    <div style={{ padding: 20 }}>
      <AnnotateImageModal
        visible={annotateModal}
        setVisible={setAnnotateModal}
        image={currentImage}
        onClose={() => setAnnotateModal(false)}
      />

      <ArentGrid gap={20} columns="1fr 1fr 1fr 1fr">
        {images.value.map((image, index) => {
          return (
            <div style={{ position: "relative" }}>
              <OverflowMenu
                style={{
                  background: "white",
                  position: "absolute",
                  top: 10,
                  right: 10,
                  zIndex: 1,
                }}
              >
                <OverflowMenuItem
                  onClick={() => {
                    setCurrentImage(image);
                    setAnnotateModal(true);
                  }}
                  itemText="Annotate"
                />
              </OverflowMenu>
              <div
                style={{ width: "100%", height: "100%", position: "relative" }}
              >
                <p style={{ position: "absolute", right: 2, bottom: 0 }}>
                  {image.annotations && "Annotated"}
                </p>
                <img src={image.url} width="100%" />
              </div>
            </div>
          );
        })}
      </ArentGrid>
    </div>
  );
}
