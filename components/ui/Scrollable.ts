import styled from "styled-components";

export const Scrollable = styled.div<{ height: string }>`
  overflow-y: scroll;
  height: ${(props) => props.height};
  max-height: 100%;
  overscroll-behavior: contain;
`;
