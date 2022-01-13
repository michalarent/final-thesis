import styled from "styled-components";
import { colors } from "../theme/colors";
import { ArentFlex, ArentGrid } from "./ui/navigation/layout/ArentGrid";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import React, { useState } from "react";
import AutoForm from "./ui/forms/AutoForm";
import { CreateOrUpdateAppointment } from "../data/appointment/appointment";
import MeetingForm from "./ui/forms/MeetingForm";
import { Button } from "carbon-components-react";
import { ConsolidatedWound } from "../hooks/user/types";

const Container = styled.div`
  border-radius: 5px;
  width: 100%;

  position: relative;
  background: ${colors.border};
  & small {
    font-size: 12px;
  }

  padding: 20px 20px;
  & p {
    font-size: 14px;
  }
`;

export const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 2px solid ${colors.border};
`;

const AdaptiveHeight = (slider) => {
  function updateHeight() {
    slider.container.style.height =
      slider.slides[slider.track.details.rel].offsetHeight + "px";
  }
  slider.on("created", updateHeight);
  slider.on("slideChanged", updateHeight);
};

export default function DoctorCard({
  doctor,
  currentWound,
  user,
}: {
  doctor: any;
  currentWound: ConsolidatedWound;
  user: any;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [refCallback, instanceRef] = useKeenSlider({
    loop: false,
    mode: "snap",
    initial: 0,

    renderMode: "performance",

    dragSpeed: 1,
    slides: {
      perView: 1,
    },

    vertical: false,
    defaultAnimation: {
      duration: 500,
    },

    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  return (
    <Container ref={refCallback} className="keen-slider">
      <div
        key={0 + "-overflow-card"}
        className="keen-slider__slide "
        style={{
          width: "100%",
        }}
      >
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
              Consultation for <b>{currentWound.woundLocation} wound</b>{" "}
              treatment{" "}
            </small>
            <h3>{doctor.name}</h3>
            <h4>
              {doctor.doctorData.specialization.label} |{" "}
              {doctor.doctorData.country}
            </h4>
          </ArentFlex>
          <Button onClick={() => instanceRef.current.next()}>
            Schedule a Time
          </Button>
        </ArentGrid>
      </div>
      <div
        key={0 + "-overflow-card"}
        className="keen-slider__slide "
        style={{
          width: "100%",
          display: "flex",
        }}
      >
        <ArentFlex direction="column" gap={20} width="100%">
          <MeetingForm wound={currentWound} doctor={doctor} user={user} />

          <ArentFlex width="95%" justify="space-between">
            <Button onClick={() => instanceRef.current.prev()} type="reset">
              Go Back
            </Button>
          </ArentFlex>
        </ArentFlex>
      </div>
    </Container>
  );
}
