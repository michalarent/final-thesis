import failwith from "../common/util/failwith";
import { getOrm } from "../db";
import { Appointment } from "../db/Appointment";
import { Doctor } from "../db/Doctor";
import Image from "../db/Image";
import { Wound } from "../db/Wound";
import WoundFormData from "../db/WoundFormData";
import { getPatient } from "./PatientServices";

export async function addWound(authId: string, formData: any): Promise<any> {
  const orm = await getOrm();
  const patient = await getPatient(authId);
  if (!patient) {
    failwith("Patient not found");
  }
  const newWound = orm.em.create(Wound, {
    patient,
    woundData: formData,
  });
  await orm.em.persistAndFlush(newWound);
  return newWound;
}

export async function deleteWound(authId: string, id: number): Promise<any> {
  const orm = await getOrm();
  const patient = await getPatient(authId);
  if (!patient) {
    failwith("Patient not found");
  }
  const wound = await orm.em.findOne(Wound, { id });

  // delete all appointments associated with this wound
  const appointments = await orm.em.find(Appointment, { wound });
  appointments.forEach((appointment) => {
    orm.em.remove(appointment);
  });

  if (!wound) {
    failwith("Wound not found");
  }

  await orm.em.removeAndFlush(wound);
  return wound;
}

export async function getWound(woundId: any): Promise<Wound> {
  const orm = await getOrm();

  const wound = await orm.em
    .createQueryBuilder(Wound, "wound")
    .select("*")
    .where({ id: woundId })
    .leftJoinAndSelect("wound.patient", "patient")
    .leftJoinAndSelect("wound.woundData", "woundData")
    .leftJoinAndSelect("wound.treatments", "treatments")

    .getSingleResult();

  return wound;
}

export async function getWounds(authId: string): Promise<Wound[]> {
  const orm = await getOrm();
  const patient = await getPatient(authId);
  if (!patient) {
    failwith("Patient not found");
  }

  const wounds = await orm.em.find(Wound, {
    patient,
  });

  let woundsWithData = [];

  for (var w in wounds) {
    let _data = orm.em.find(WoundFormData, {
      wound: wounds[w],
    });
    let _appointments = orm.em.find(Appointment, {
      wound: wounds[w],
    });

    let [data, appointments] = await Promise.all([_data, _appointments]);

    appointments = appointments.map((app) => {
      if (app.wound.id === wounds[w].id) {
        return app;
      } else {
        return null;
      }
    });

    for (var a in appointments) {
      if (appointments[a]) {
        let doc = await orm.em.findOne(Doctor, {
          authId: appointments[a].doctor as any,
        });

        appointments[a].doctor = doc;
      }
    }

    for (var d in data) {
      woundsWithData.push({
        woundId: wounds[w].id,
        woundDataId: data[d].id,
        appointments: appointments,
        ...data[d],
      });
    }
  }

  return woundsWithData;
}

export async function getAppointmentsForWound(woundId: number) {
  const orm = await getOrm();

  // const appointment = await orm.em.findOne(Appointment, {
  //   wound: woundId,
  // });

  const appointments = await orm.em
    .createQueryBuilder(Appointment, "appointment")
    .select("*")
    .where({ wound: { id: woundId } })
    .join("images", "i")
    .where("i.appointment_id = appointment.id")
    .select("*")
    .getResultList();

  return appointments;
}
