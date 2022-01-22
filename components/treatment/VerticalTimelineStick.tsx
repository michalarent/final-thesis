import styled from "styled-components";
import { getShortDate, getStandardDate } from "../../common/util/dates";
import { ArentFlex } from "../ui/navigation/layout/ArentGrid";

const TimelineStick = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: 100%;
  background: black;
`;

const TimelineCircle = styled.div<{ top: string }>`
  position: absolute;
  top: ${(props) => props.top};
  left: -80px;
  border-radius: 5px;
  width: 160px;
  padding: 10px;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

export default function VerticalTimelineStick({
  height,
  events,
  eventPadding,
}: {
  height: number;
  events: any[];
  eventPadding: number;
}) {
  return (
    <div style={{ position: "relative", width: "160px", height: "100%" }}>
      <TimelineStick>
        {events.map((event, i) => (
          <TimelineCircle top={`${i * (height + eventPadding)}px`}>
            <ArentFlex direction="column" gap={5} align="center">
              <strong>Action {i + 1}</strong>
              <small style={{ fontSize: 10 }}>
                {getStandardDate(new Date(event.date).getTime())}
              </small>
            </ArentFlex>
          </TimelineCircle>
        ))}
      </TimelineStick>
    </div>
  );
}
