import AutoForm from "../../../components/ui/forms/AutoForm";
import LayoutBase from "../../../components/ui/navigation/layout";
import { UpdateAccountInfo } from "../../../data/general/account";
import { usePatientOrDoctor, useUser } from "../../../hooks/user";

export default function UpdateAccount() {
  const user = useUser();
  const patient = usePatientOrDoctor(user.authId);

  return (
    <LayoutBase title="Update Account" breadcrumbs={["Dashboard", "Account"]}>
      <AutoForm
        submitUrl={"/api/user"}
        initialData={patient}
        data={UpdateAccountInfo}
      />
    </LayoutBase>
  );
}
