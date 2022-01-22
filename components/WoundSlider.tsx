import styled from "styled-components";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import Arrow, { ArrowButton } from "./Arrow";
import { useState } from "react";
import { ArentFlex } from "./ui/navigation/layout/ArentGrid";

export const OverflowContainer = styled.div`
  transition: none;
  width: 100%;
  max-width: 100%;
`;

const WheelControls = (slider) => {
  let touchTimeout;
  let position;
  let wheelActive;

  function dispatch(e, name) {
    position.x -= e.deltaX;

    slider.container.dispatchEvent(
      new CustomEvent(name, {
        detail: {
          x: position.x,
          y: position.y,
        },
      })
    );
  }

  function wheelStart(e) {
    position = {
      x: e.pageX,
    };
    dispatch(e, "ksDragStart");
  }

  function wheel(e) {
    dispatch(e, "ksDrag");
  }

  function wheelEnd(e) {
    dispatch(e, "ksDragEnd");
  }

  function eventWheel(e) {
    e.preventDefault();
    if (!wheelActive) {
      wheelStart(e);
      wheelActive = true;
    }
    wheel(e);
    clearTimeout(touchTimeout);
    touchTimeout = setTimeout(() => {
      wheelActive = false;
      wheelEnd(e);
    }, 50);
  }

  slider.on("created", () => {
    slider.container.addEventListener("wheel", eventWheel, {
      passive: false,
    });
  });
};

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

export default function WoundSlider({
  cards,
  perView,
}: {
  cards: React.ReactNode[];
  perView?: number;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [refCallback, instanceRef] = useKeenSlider(
    {
      loop: false,
      mode: "snap",
      initial: 0,

      renderMode: "performance",

      dragSpeed: 1,
      rubberband: true,
      vertical: false,
      defaultAnimation: {
        duration: 1500,
      },

      slides: {
        spacing: 24,
        perView: perView || 2.5,
      },

      breakpoints: {
        "(max-width: 1280px)": {
          rubberband: false,
          slides: { perView: 2.8, spacing: 24 },
        },
        "(max-width: 992px)": { slides: { perView: 2.1, spacing: 24 } },
        "(max-width: 700px)": { slides: { perView: 1.7, spacing: 16 } },
        "(max-width: 576px)": { slides: { perView: 1.1, spacing: 16 } },
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
    },
    [MutationPlugin]
  );

  return (
    <>
      <OverflowContainer ref={refCallback} className="keen-slider">
        {cards.map((card, index) => (
          <div
            key={index + "-overflow-card"}
            className="keen-slider__slide "
            style={{
              overflow: "visible",
              height: "300px",
              width: "100%",
            }}
          >
            {card}
          </div>
        ))}
      </OverflowContainer>
      {/* <ArentFlex style={{ marginTop: 30 }} gap={20}>
        <ArrowButton onClick={() => instanceRef.current?.prev()}>
          <Arrow left />
        </ArrowButton>
        <ArrowButton onClick={() => instanceRef.current?.next()}>
          <Arrow />
        </ArrowButton>
      </ArentFlex> */}
    </>
  );
}
