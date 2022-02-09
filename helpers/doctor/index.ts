import _ from "lodash";
import { DateTime } from "luxon";
import { EventType } from "../../common/util/icons";
import { ReadyLoader } from "../../hooks/useLoaderSWR";
import { ConsolidatedTreatment } from "../../hooks/user/types";
import { ConsolidatedAppointment } from "./types";

export function getListOfAllUniquePatientsFromAppointments(
  appointments: ConsolidatedAppointment[]
) {
  const patients = appointments.map((appointment) => appointment.patient);
  const uniquePatients = _.uniqBy(patients, "authId");

  return uniquePatients;
}

export function getListOfAllEvents(
  treatmentData: ReadyLoader<ConsolidatedTreatment>
) {
  const events = treatmentData.value.timelineEvents.map((event) => {
    return {
      ...event,
      date: DateTime.fromISO(new Date(event.date).toISOString()),
    };
  });
  const mappedAppointmentsWithType = treatmentData.value.appointments.map(
    (appointment) => {
      return {
        ...appointment,
        date: DateTime.fromISO(new Date(appointment.date).toISOString()).set({
          hour: 0,
          minute: 0,
          second: 0,
        }),
        type: "appointment",
      };
    }
  );
  // merge appointments and timeline events
  const mergedEvents = [
    ...events,
    ..._.uniqBy(mappedAppointmentsWithType, "id"),
  ];

  return mergedEvents.sort((a, b) => a.date.toMillis() - b.date.toMillis());
}

export type CalendarEventType = {
  date: DateTime | string | number;
  id: number;
  type: EventType;
  name: string;
  comments?: string;
};
