import AutoForm from "../../../components/ui/forms/AutoForm";
import LayoutBase from "../../../components/ui/navigation/layout";
import { CreateUpdateDoctor } from "../../../data/doctor/doctor";

export default function CreateDoctor() {
  return (
    <LayoutBase
      title="Create Doctor"
      breadcrumbs={["Dashboard", "Doctor", "New"]}
    >
      <AutoForm submitUrl="/api/doctor" data={CreateUpdateDoctor} />
    </LayoutBase>
  );
}
