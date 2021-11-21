import styled from "styled-components";
import { motion } from "framer-motion";
import { colors } from "../../../theme/colors";

export const FormContainer = styled(motion.div)<{
  current?: boolean;
  isPrevious?: boolean;
}>`
  position: relative;
  border-radius: 2px;
  background-color: ${(props) =>
    props.current
      ? colors.white
      : props.isPrevious
      ? "rgba(255,255,255,0.9)"
      : "rgba(255,255,255,0.3)"};

  padding: 40px;

  > * {
    transition: all 0.3s;

    z-index: ${(props) => (props.current ? "120" : "1")};
    pointer-events: ${(props) => (props.current ? "auto" : "none")};
    opacity: ${(props) => (props.current ? "1" : "0.3")};
    filter: grayscale(${(props) => (props.current ? "0" : "1")});
  }
`;

export const Inputs = styled(motion.div)<{
  span?: number;
  current?: boolean;
  isPrevious?: boolean;
}>`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
  width: 800px;
  grid-column: span ${(props) => props.span || "6"};
`;

export const StepNumber = styled.div<{ current? }>`
  font-size: 44px;
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  color: ${(props) => (props.current ? colors.aquamarine : colors.border)};
  border: ${(props) => (props.current ? "2px solid aquamarine" : "none")};
  border-radius: 50%;
  padding: 10px;
  background-color: ${(props) =>
    props.current ? colors.white : "transparent"};
`;
