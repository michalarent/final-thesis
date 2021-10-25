import styled from "styled-components";

const Container = styled.div<{ width; height }>`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  border-radius: 20px;
  border: 1px solid #e0e0e0;
  background-color: #fff;
  overflow: scroll;
  padding: 20px;
  transition: all 0.2s linear;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Card({
  width,
  height,
  children,
}: {
  width?: string;
  height?: string;
  children?: any;
}) {
  return (
    <Container width={width} height={height}>
      {children}
    </Container>
  );
}
