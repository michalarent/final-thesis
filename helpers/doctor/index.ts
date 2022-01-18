import _ from "lodash";
import { ConsolidatedAppointment } from "./types";

export function getListOfAllUniquePatientsFromAppointments(
  appointments: ConsolidatedAppointment[]
) {
  const patients = appointments.map((appointment) => appointment.patient);
  const uniquePatients = _.uniqBy(patients, "authId");

  return uniquePatients;
}
