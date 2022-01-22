import {
  Button,
  Select,
  SelectItem,
  TextArea,
  TextInput,
} from "carbon-components-react";
import { DateTime } from "luxon";
import { useState } from "react";
import styled from "styled-components";
import apiCall from "../../../common/api/ApiCall";
import { getStandardDate } from "../../../common/util/dates";
import { ArentFlex, ArentGrid } from "../../ui/navigation/layout/ArentGrid";

export default function NewTimelineEvent({
  treatmentId,
  currentDate,
  setRequestLoading,
}: {
  treatmentId: any;
  currentDate: DateTime;
  setRequestLoading: any;
}) {
  const [eventName, setEventName] = useState<string>("");
  const [select, setSelect] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  async function postTimelineEvent(
    treatmentId: string,
    event: any
  ): Promise<any> {
    setRequestLoading(true);
    const res: any = await apiCall(`/api/treatment/timeline`, "POST", {
      treatmentId,
      event,
    });
    setRequestLoading(false);
    return res;
  }

  return (
    <Wrapper>
      <ArentFlex direction="column" align="start" width="100%">
        <h4>Setup a new event @ {getStandardDate(currentDate.toMillis())}</h4>
        <p style={{ marginBottom: "1rem" }}>
          Remind your patient about this event.
        </p>
        <TextInput
          labelText="Event Name"
          style={{ minWidth: "100%", width: "100%", marginBottom: "1rem" }}
          onChange={(e) => setEventName(e.currentTarget.value)}
          value={eventName}
          id={""}
        />
        <ArentGrid columns="1fr 1fr" gap={20} align="start">
          <Select
            onChange={(e) => setSelect(e.currentTarget.value)}
            value={select}
            labelText="Event type"
            style={{ width: "100%" }}
            id={""}
          >
            <SelectItem
              style={{ width: "100%" }}
              value={"checkup"}
              label="Check-up Meeting"
              text={""}
            />
            <SelectItem
              style={{ width: "100%" }}
              value={"request"}
              label="Request photos from patient on this date"
              text={""}
            />
            <SelectItem
              style={{ width: "100%" }}
              value={"chat"}
              label="Chat with patient"
              text={""}
            />
            <SelectItem
              style={{ width: "100%" }}
              value={"video"}
              label="Video Meeting™"
              text={""}
            />
            <SelectItem
              style={{ width: "100%" }}
              value={"treatment"}
              label="Treatment 🚒"
              text={""}
            />
          </Select>
          <Button
            onClick={() => {
              postTimelineEvent(treatmentId, {
                name: eventName,
                type: select,
                comment: comment || "",
                date: currentDate.toJSDate(),
              });
            }}
            size="field"
            style={{ width: "100%", alignSelf: "end" }}
          >
            Setup Event
          </Button>
          <div style={{ width: "100%" }}>
            {select === "treatment" && (
              <TextArea
                onChange={(e) => setComment(e.target.value)}
                labelText="Treatment Explanation"
              ></TextArea>
            )}
          </div>
          <img src="/graphics/meeting.png" width="100%" />
        </ArentGrid>
      </ArentFlex>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  & .bx--form-item,
  .bx--text-input-wrapper {
    width: 100%;
  }
  & img {
    align-self: flex-end;
  }
`;
