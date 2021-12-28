import { Loading } from "carbon-components-react";
import router, { useRouter } from "next/router";
import AutoForm from "../../../components/ui/forms/AutoForm";
import LayoutBase from "../../../components/ui/navigation/layout";
import { CreateOrUpdateAppointment } from "../../../data/appointment/appointment";
import { Doctor } from "../../../db/Doctor";
import { useDoctors, useUser, useWounds } from "../../../hooks/user";

export default function Appointment() {
  const router = useRouter();
  const user = useUser();
  const doctors = useDoctors();
  const wound = useWounds(user.authId);
  const { woundId, doctor } = router.isReady && router.query;

  if (!doctors) return <Loading />;

  const requestedDoctor: Doctor = doctors?.find(
    (d) => d?.doctorData?.pesel === doctor
  );

  if (!requestedDoctor) return <Loading />;

  return (
    <LayoutBase
      title={"Appointment: Wound #" + woundId}
      breadcrumbs={["Dashboard", "Appointments", woundId.toString()]}
    >
      <small>New Appointment for wound #{woundId} with </small>
      <h3>
        {requestedDoctor.doctorData.firstName +
          " " +
          requestedDoctor.doctorData.lastName +
          " | " +
          requestedDoctor.doctorData.specialization.label}
      </h3>
      <AutoForm
        data={CreateOrUpdateAppointment}
        submitUrl={`/api/appointment`}
        initialData={[
          { requestedDoctor: requestedDoctor.authId, wound: woundId },
        ]}
      />
    </LayoutBase>
  );
}
