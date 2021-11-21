import LayoutBase from "../../../components/ui/navigation/layout";
import { useUser } from "../../../hooks/user";
import ScrollingForm from "../../../components/ui/forms/ScrollingForm";
import { GeneralFormInput } from "../../../data/general/general";

export default function Onboarding() {
  const user = useUser();

  return (
    <LayoutBase
      title="Medical History"
      breadcrumbs={["Dashboard", "Onboarding", "New"]}
    >
      <ScrollingForm multi data={GeneralFormInput} />
    </LayoutBase>
  );
}
