import React from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import styled from "styled-components";

const breakpoints = { desktop: 1200, smallDesktop: 800, mobile: 0 };

export const ArentGrid = styled.div<{
  gap?: number | string;
  columns?: string;
  rows?: string;
  width?: string;
  padding?: string;
  align?: string;
  justify?: string;
  smallDesktop?: { columns?: string; rows?: string; gap: number };
  mobile?: { columns?: string; rows?: string; gap: number };
}>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  grid-template-rows: ${(props) => props.rows};
  padding: ${(props) => props.padding || "0"};
  gap: ${(props) => props.gap + "px" || "0"};
  width: ${(props) => props.width || "100%"};
  align-items: ${(props) => props.align || "center"};
  justify-items: ${(props) => props.justify || "center"};
`;

export const ArentFlex = styled.div<{
  gap?: number;
  align?: string;
  justify?: string;
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  padding?: string;
  width?: string;
  height?: string;
  overflowX?: boolean;
}>`
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  justify-content: ${(props) => props.justify || "start"};
  align-items: ${(props) => props.align || "start"};
  column-gap: ${(props) => props.gap + "px" || "0"};
  row-gap: ${(props) => props.gap + "px" || "0"};
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  padding: ${(props) => props.padding || "0"};
  overflow-x: ${(props) => (props.overflowX ? "auto" : "hidden")};
  overflow-y: hidden;
`;

const Overflow = styled.div<{
  overflowX?: boolean;
  overflowY?: boolean;
  width?: string;
  padding?: number;
}>`
  overflow-x: ${(props) => (props.overflowX ? "auto" : "hidden")};
  overflow-y: ${(props) => (props.overflowY ? "auto" : "hidden")};
  width: ${(props) => props.width || "100%"};
  position: relative;
  padding: 0 ${(props) => props.padding + "px" || "0"};
  -webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;
