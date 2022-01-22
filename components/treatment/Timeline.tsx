import { InlineLoading, Loading, Tile } from "carbon-components-react";
import { DateTime } from "luxon";
import { getStandardDate } from "../../common/util/dates";
import {
  HandleEventTypeIcon,
  HandleEventTypeString,
} from "../../common/util/icons";
import { ArentFlex, ArentGrid } from "../ui/navigation/layout/ArentGrid";
import ClientLoading from "../util/ClientLoading";
import WoundSlider from "../WoundSlider";
import TimelineSlider from "./TImelineSlider";
import { WoundIndicator } from "./TreatmentPatientCard";
import VerticalTimelineStick from "./VerticalTimelineStick";

export default function Timeline({
  events,
}: {
  events: {
    date: DateTime;
    title: string;
    type: string;
  }[];
}) {
  if (!events || typeof events !== "object") {
    return <InlineLoading />;
  }
  return (
    <ArentGrid columns="auto 1fr" gap={20}>
      <VerticalTimelineStick events={events} eventPadding={20} height={70} />
      <ArentFlex gap={20} direction="column" width="100%">
        {events.map((event) => {
          return (
            <Tile
              style={{
                width: "100%",
                height: 70,
                background: "#e4e4e4",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <ArentGrid
                justify="start"
                align="center"
                style={{ height: "100%" }}
                columns="auto 1fr"
                gap={20}
              >
                <WoundIndicator>
                  {HandleEventTypeIcon[event.type]}
                </WoundIndicator>
                <ArentFlex direction="column" gap={5} align="start">
                  <strong>{HandleEventTypeString[event.type]}</strong>
                  <small>{getStandardDate(event.date.toMillis())}</small>
                </ArentFlex>
              </ArentGrid>
            </Tile>
          );
        })}
      </ArentFlex>
    </ArentGrid>
  );
}
