import { Loading } from "carbon-components-react";
import AutoForm from "../../../components/ui/forms/AutoForm";
import LayoutBase from "../../../components/ui/navigation/layout";
import { CreateUpdateDoctor } from "../../../data/doctor/doctor";
import { useDoctor, useUser } from "../../../hooks/user";

export default function CreateDoctor() {
  const user = useUser();
  const doctor = useDoctor(user.authId);

  if (!doctor) {
    return <Loading />;
  }

  return (
    <LayoutBase
      title="Create Doctor"
      breadcrumbs={["Dashboard", "Doctor", "Edit"]}
    >
      <AutoForm
        initialData={doctor.doctorData}
        submitUrl="/api/doctor"
        data={CreateUpdateDoctor}
      />
    </LayoutBase>
  );
}
