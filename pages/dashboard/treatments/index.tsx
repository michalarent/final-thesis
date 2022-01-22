import { Tab, Tabs } from "carbon-components-react";
import Timeline from "../../../components/treatment/Timeline";
import TimelineSlider from "../../../components/treatment/TImelineSlider";
import { Container } from "../../../components/ui/Container";
import LayoutBase from "../../../components/ui/navigation/layout";
import { ArentFlex } from "../../../components/ui/navigation/layout/ArentGrid";

export default function TreatmentPage() {
  return (
    <LayoutBase title="Treatments" breadcrumbs={["Treatments"]}>
      <Container>
        <small>PATIENT</small>
        <h3>Patient Name</h3>
        <p>Treatment of $WOUND </p>
        <p>Started on: 24.12.2020</p>
        <p>Consultations since: 4</p>
        <p style={{ marginBottom: 30 }}>Last consultation: 24.12.2020</p>

        <p> Hi</p>
        <Timeline />
      </Container>
    </LayoutBase>
  );
}
