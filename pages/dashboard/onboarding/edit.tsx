import LayoutBase from "../../../components/ui/navigation/layout";
import { usePatientOrDoctor, useUser } from "../../../hooks/user";
import ScrollingForm from "../../../components/ui/forms/ScrollingForm";
import { GeneralFormInput } from "../../../data/general/general";
import AutoForm from "../../../components/ui/forms/AutoForm";

export default function Onboarding() {
  const user = useUser();
  const patient = usePatientOrDoctor(user.authId);

  const data = GeneralFormInput[0].inputs.concat(GeneralFormInput[1].inputs);

  console.log(data);

  return (
    <LayoutBase
      title="Edit Data"
      breadcrumbs={["Dashboard", "Onboarding", "Edit"]}
    >
      <AutoForm data={data} initialData={patient?.medicalFormData} />
    </LayoutBase>
  );
}
