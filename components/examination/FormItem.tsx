import {
  IoChatbubble,
  IoCheckbox,
  IoImageSharp,
  IoText,
} from "react-icons/io5";
import styled from "styled-components";
import { ArentFlex } from "../ui/navigation/layout/ArentGrid";

export default function FormItem({
  onClick,
  type,
}: {
  onClick: () => void;
  type: "Image" | "Select" | "Text" | "Checkbox";
}) {
  const ICONS = {
    Image: <IoImageSharp size={30} />,
    Select: <IoChatbubble size={30} />,
    Text: <IoText size={30} />,
    Checkbox: <IoCheckbox size={30} />,
  };

  return (
    <Container onClick={onClick}>
      <ArentFlex
        direction="column"
        gap={10}
        justify="center"
        align="center"
        height="100%"
      >
        {type}
        {ICONS[type]}
      </ArentFlex>
    </Container>
  );
}

const Container = styled.div`
  width: 140px;
  height: 140px;
  cursor: pointer;
  background: #e0e0e0;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
`;
