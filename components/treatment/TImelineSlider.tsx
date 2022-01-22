import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";
import styled from "styled-components";
import { colors } from "../../theme/colors";
import { OverflowContainer } from "../WoundSlider";

const MutationPlugin = (slider) => {
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      slider.update();
    });
  });
  const config = { childList: true };

  slider.on("created", () => {
    observer.observe(slider.container, config);
  });
  slider.on("destroyed", () => {
    observer.disconnect();
  });
};

export default function TimelineSlider({}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      spacing: 2,
      perView: 1.2,
    },
  });

  return (
    <>
      <OverflowContainer ref={sliderRef} className="keen-slider">
        <div
          key={"-overflow-card"}
          className="keen-slider__slide "
          style={{
            background: colors.black,
            overflow: "visible",
            height: "300px",
          }}
        >
          Hey
        </div>
        <div
          key={"-overflow-card"}
          className="keen-slider__slide "
          style={{
            overflow: "visible",
            height: "300px",
          }}
        >
          Hey
        </div>
      </OverflowContainer>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;

  .keen-slider {
    width: 100%;
    .keen-slider__slide {
      height: 300px;
    }
  }
`;
