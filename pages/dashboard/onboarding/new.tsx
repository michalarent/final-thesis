import LayoutBase from "../../../components/ui/navigation/layout";
import { useUser } from "../../../hooks/user";
import ScrollingForm from "../../../components/ui/forms/ScrollingForm";
import { GeneralFormInput } from "../../../data/general/general";
import useUserInfo from "../../../hooks/user/usePatientInfo";
import { Loading } from "carbon-components-react";
import AutoForm from "../../../components/ui/forms/AutoForm";
import { MedicalHistoryForm } from "../../../data/medical-info";

export default function Onboarding() {
  const { basics, patientData, doctorData } = useUserInfo();

  const basicsReady = basics.status === "ready";
  const patientDataReady = basicsReady && patientData.status === "ready";
  const doctorDataReady = basicsReady && doctorData.status === "ready";

  const ready = basicsReady && patientDataReady && doctorDataReady;

  if (!ready) {
    return <Loading />;
  }

  return (
    <LayoutBase
      title="Medical History"
      breadcrumbs={["Dashboard", "Onboarding", "New"]}
    >
      <AutoForm
        data={MedicalHistoryForm}
        submitUrl="/api/patient/medical_history"
      />
    </LayoutBase>
  );
}
