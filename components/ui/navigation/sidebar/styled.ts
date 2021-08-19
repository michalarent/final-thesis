import styled from "styled-components";
import { motion } from "framer-motion";
import { colors } from "../../../../theme/colors";
import { animated } from "@react-spring/web";

export const Content = styled(animated.div)`
  will-change: transform, opacity, height;
  margin-left: 5px;
  padding: 0px 0px 0px 0;
  // border-left: 3px lightgray solid;
  overflow: hidden;
  height: 100%;
  opacity: 1;
`;

export const Grid = styled.div`
  grid-template-columns: 50px 160px 90px;
  display: grid;
`;
