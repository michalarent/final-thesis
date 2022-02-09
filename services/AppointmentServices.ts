import failwith from "../common/util/failwith";
import { getOrm } from "../db";
import { Appointment } from "../db/Appointment";
import { Doctor } from "../db/Doctor";
import { Wound } from "../db/Wound";
import WoundFormData from "../db/WoundFormData";
import { getDoctor } from "./DoctorServices";
import { getPatient } from "./PatientServices";
import { getWound, getWounds } from "./WoundServices";
import Image from "../db/Image";
import { getTreatmentForAppointment } from "./TreatmentServices";

export async function addAppointment(
  authId: string,
  woundId: string,
  doctorData: any,
  formData: any
): Promise<any> {
  const orm = await getOrm();

  const wound = await getWound(woundId);
  const doctor = await getDoctor(doctorData.authId);

  if (!wound) {
    failwith("Wound not found");
  } else {
    try {
      const newAppointment = orm.em.create(Appointment, {
        wound,
        doctor,
        date: new Date(
          formData.appointmentDay[0].substring(0, 10) +
            " " +
            formData.appointmentTime +
            ":00"
        ),
        info: {
          urgent: formData.urgent,
          additionalComments: formData.comment,
        },
      });

      await orm.em.persistAndFlush(newAppointment);
      return newAppointment;
    } catch (e) {
      failwith(e);
    }
  }
}

export async function getAppointments(authId: string) {
  const orm = await getOrm();
  const patient = await getPatient(authId);

  if (!patient) {
    failwith("Patient not found");
  } else {
    const wounds = await getWounds(authId);

    let appointments = [];
    for (var w in wounds) {
      let app = await orm.em.find(Appointment, {
        id: wounds[w].id,
      });
      for (var a in app) {
        appointments.push(app[a]);
      }
    }
    return appointments;
  }
}

export async function getAppointment(appointmentId: number) {
  const orm = await getOrm();

  if (!appointmentId) {
    failwith("Appointment not found by ID");
  } else {
    const appointment = await orm.em.findOneOrFail(Appointment, {
      id: appointmentId as any,
    });

    const [doctor, wound] = await Promise.all([
      orm.em.findOneOrFail(Doctor, {
        authId: appointment.doctor,
      }),

      orm.em.findOneOrFail(Wound, {
        id: appointment.wound,
      }),
    ]);

    const woundData = await orm.em.findOneOrFail(WoundFormData, {
      wound,
    });

    const treatment = await getTreatmentForAppointment(appointment.id);

    return { appointment, doctor, wound: woundData, treatment };
  }
}

export async function deleteAppointment(appointmentId) {
  const orm = await getOrm();

  console.log("Delete appointment: ");

  if (!appointmentId) {
    failwith("Appointment not found by ID");
  }

  const appointment = await orm.em.findOneOrFail(Appointment, {
    id: appointmentId as any,
  });

  await orm.em.removeAndFlush(appointment);
}
