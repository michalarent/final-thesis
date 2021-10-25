import styled from "styled-components";
import { colors } from "../../../theme/colors";

export const ButtonGrid = styled.div<{ current?: boolean }>`
  position: absolute;
  grid-column: span 0;
  padding: 0;
  margin: 0;
  height: 50px;
  gap: 30px;
  right: -40%;
  width: 300px;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  height: calc(100%);
  display: ${(props) => (props.current ? "compact" : "none")};

  > .submit {
    & svg {
      position: absolute;
      top: 50%;
      left: 2%;
      transform: translateY(-50%);
      width: 30px;
      height: 30px;
    }
  }
  > .up {
    & button {
      position: absolute;
      bottom: 0;
    }
  }
`;

export const NiceButton = styled.div<{ correct }>`
  position: absolute;
  bottom: 25px;
  right: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 40px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.correct ? colors.aquamarine : "whitesmoke"};
  color: white !important;
  font-weight: bold;
  pointer-events: ${(props) => (props.correct ? "none" : "auto")};

  &:hover {
    cursor: ${(props) => (props.correct ? "pointer" : "not-allowed")};
    background-color: ${(props) =>
      props.correct ? colors.mint : "whitesmoke"};
    color: ${colors.white};
  }

  & svg {
    margin-left: 10px;
  }
`;
