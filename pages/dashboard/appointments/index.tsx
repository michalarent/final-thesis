import { ClickableTile, Loading } from "carbon-components-react";
import router from "next/router";
import React from "react";
import LayoutBase from "../../../components/ui/navigation/layout";
import { ArentFlex } from "../../../components/ui/navigation/layout/ArentGrid";
import {
  useAppointments,
  useDoctor,
  useDoctors,
  useUser,
  useWounds,
} from "../../../hooks/user";
import { ArrowRight16 } from "@carbon/icons-react/";

export default function ListAppointments() {
  const user = useUser();
  const doctors = useDoctors();
  const appointments = useAppointments(user.authId);

  const wounds = useWounds(user.authId);

  if (!user || !appointments || !appointments.length || !wounds || !doctors) {
    return <Loading />;
  }

  console.log(appointments);
  return (
    <LayoutBase breadcrumbs={["Appointments", "List"]}>
      <ArentFlex direction="column" gap={10} width="100%" justify="center">
        {appointments.map((app) => {
          const wound = wounds.find((wound) => wound.id === app.wound);
          const doctor = doctors.find((doctor) => doctor.email === app.doctor);
          console.log(wound.woundFormData.woundType.label);
          console.log(doctor);
          return (
            <ClickableTile
              style={{ width: "100%" }}
              onClick={() =>
                router.push(`/dashboard/appointments/edit/${app.id}`)
              }
            >
              <small>
                Appointment (id: {app.id}) with{" "}
                {doctor.doctorData.firstName + " " + doctor.doctorData.lastName}
                {", "}
                {doctor.doctorData.specialization.label}
              </small>
              <h4>{wound.woundFormData.woundType.label}</h4>
              <h5>{new Date(app.date).toLocaleString()}</h5>
              <br />
              <br />
              <ArentFlex align="center" gap={10} width="100%">
                <strong>Annotate Images</strong>
                <ArrowRight16 />
              </ArentFlex>
            </ClickableTile>
          );
        })}
      </ArentFlex>
    </LayoutBase>
  );
}
