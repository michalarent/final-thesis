import {
  Button,
  OverflowMenu,
  OverflowMenuItem,
} from "carbon-components-react";
import styled from "styled-components";
import { colors } from "../theme/colors";
import { ArentFlex } from "./ui/navigation/layout/ArentGrid";
import { DeleteIcon } from "./WoundCard";

export const ImageCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border-radius: 5px;
  width: 100%;
  padding: 20px;
  height: 100%;
  position: relative;
  background: ${colors.border};
  & small {
    font-size: 12px;
  }

  & p {
    font-size: 14px;
  }
`;

const WoundImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  object-fit: cover;
  border: 2px solid ${colors.border};
`;

export default function ImageCard({ src, onDelete, onStartAnnotate }) {
  return (
    <ImageCardContainer>
      <DeleteIcon>
        <OverflowMenu style={{ background: colors.white + "dd" }}>
          <OverflowMenuItem onClick={onDelete} itemText="Delete" />
          <OverflowMenuItem
            onClick={onStartAnnotate}
            itemText="Add Annotations"
          />
        </OverflowMenu>
      </DeleteIcon>
      <WoundImage src={src} />
    </ImageCardContainer>
  );
}
