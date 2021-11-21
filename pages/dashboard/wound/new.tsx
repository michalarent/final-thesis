import AutoForm from "../../../components/ui/forms/AutoForm";
import LayoutBase from "../../../components/ui/navigation/layout";
import { CreateUpdateDoctor } from "../../../data/doctor/doctor";
import { WoundFormInput } from "../../../data/general/woundform";
import WoundForm from "../../woundform";

export default function CreateWound() {
  return (
    <LayoutBase
      title="Create Wound"
      breadcrumbs={["Dashboard", "Wound", "New"]}
    >
      <AutoForm submitUrl="/api/patient/wound" data={WoundFormInput} />
    </LayoutBase>
  );
}
