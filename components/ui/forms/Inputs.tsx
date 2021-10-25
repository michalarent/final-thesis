import styled from "styled-components";
import { motion } from "framer-motion";
import { colors } from "../../../theme/colors";

export const Inputs = styled(motion.div)<{
  span?: number;
  current?: boolean;
  isPrevious?: boolean;
}>`
  background-color: ${(props) =>
    props.current
      ? colors.white
      : props.isPrevious
      ? "rgba(255,255,255,0.9)"
      : "rgba(255,255,255,0.3)"};
  display: grid;
  position: relative;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 30px 30px;
  position: relative;
  padding: 120px 40px 75px 130px;
  width: 800px;
  margin: 50px 0;
  border-radius: 25px;
  grid-column: span ${(props) => props.span || "6"};
  cursor: ${(props) => (props.current ? "default" : "pointer")};

  box-shadow: ${(props) =>
    props.current
      ? "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.01) 0px 4px 6px -2px"
      : "none"};

  & h3 {
    font-size: 24px;
    font-weight: bold;
    position: absolute;
    top: 30px;
    left: 130px;
  }
  & p {
    position: absolute;
    top: 68px;
    left: 130px;
    font-weight: medium;
    font-size: 14px;
    color: gray;
  }
  > * {
    transition: all 0.3s;

    z-index: ${(props) => (props.current ? "120" : "1")};
    pointer-events: ${(props) => (props.current ? "auto" : "none")};
    opacity: ${(props) =>
      props.current ? "1" : props.isPrevious ? "1" : "0.1"};
    filter: grayscale(${(props) => (props.current ? "0" : "1")});
  }
`;

export const StepNumber = styled.div<{ current? }>`
  position: absolute;
  top: 25px;
  left: 25px;
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
