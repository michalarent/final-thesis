import styled from "styled-components";

export default function Arrow(props) {
  const disabled = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="black"
      color="black"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}

export const ArrowButton = styled.div`
  cursor: pointer;
  width: 80px;
  height: 50px;
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  & svg {
    fill: black;
  }
  &:hover {
    filter: opacity(0.8);
  }
`;
