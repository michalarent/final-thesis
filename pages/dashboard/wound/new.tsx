import { Container } from "../../../components/ui/Container";
import AutoForm from "../../../components/ui/forms/AutoForm";
import LayoutBase from "../../../components/ui/navigation/layout";
import { ArentFlex } from "../../../components/ui/navigation/layout/ArentGrid";
import { CreateUpdateDoctor } from "../../../data/doctor/doctor";
import { WoundFormInput } from "../../../data/general/woundform";
import WoundForm from "../../woundform";

export default function CreateWound() {
  return (
    <LayoutBase
      title="Create Wound"
      breadcrumbs={["Dashboard", "Wound", "New"]}
    >
      <Container>
        <ArentFlex direction="column" width="100%" gap={30}>
          <h1>Register a new Wound</h1>

          <AutoForm submitUrl="/api/patient/wound" data={WoundFormInput} />
        </ArentFlex>
      </Container>
    </LayoutBase>
  );
}
