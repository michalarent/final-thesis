import { Button, Tile } from "carbon-components-react";
import { getStandardDate } from "../../common/util/dates";
import ScheduledExaminationForm from "../../db/ScheduledExaminationForm";
import { Divider } from "../util/Divider";

export default function ScheduledExaminationItem({
  onButtonClick,
  examination,
}: {
  onButtonClick: () => void;
  examination: ScheduledExaminationForm;
}) {
  return (
    <Tile style={{ width: "100%", background: "lightblue", borderRadius: 20 }}>
      <h5>{examination.title}</h5>
      <small>{getStandardDate(examination.date)}</small>
      <Divider />
      <p>Status: {examination.status}</p>
      <br />
      <Button onClick={() => onButtonClick()}>
        {examination.status === "completed" ? "Show results" : "Fill out"}
      </Button>
    </Tile>
  );
}
