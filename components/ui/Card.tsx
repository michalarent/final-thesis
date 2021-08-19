import styled from "styled-components";

const Container = styled.div<{ width; height }>`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  border-radius: 20px;
  border: 1px solid #e0e0e0;
  background-color: #fff;
  overflow: scroll;
  padding: 20px;

  &:hover {
    background-color: #f5f5f5;
    drop-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  }
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
