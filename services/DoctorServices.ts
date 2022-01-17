import { MikroORM } from "@mikro-orm/core";
import { EntityManager, PostgreSqlDriver } from "@mikro-orm/postgresql";

import { getOrm } from "../db";
import { Appointment } from "../db/Appointment";
import { Doctor } from "../db/Doctor";
import Patient from "../db/Patient";
import { Wound } from "../db/Wound";
import WoundFormData from "../db/WoundFormData";

export async function getDoctor(authId: string): Promise<Doctor> {
  if (!authId) return null;
  console.log("getDoctor", authId);
  const orm = await getOrm();
  const doctor = await orm.em.findOne(Doctor, { authId });
  console.log(doctor);

  if (!doctor) {
    return null;
  }
  return doctor;
}

export async function getDoctorAppointments(authId: string) {
  const orm: MikroORM<PostgreSqlDriver> = await getOrm();
  const doctor = await getDoctor(authId);

  if (!doctor) {
    return null;
  } else {
    const qb = orm.em.createQueryBuilder(Appointment, "appointment");
    const _all = await qb
      .select("*")
      .where({ doctor })
      .leftJoinAndSelect("appointment.wound", "wound")
      .leftJoinAndSelect("images", "images")
      .leftJoinAndSelect("wound.patient", "patient")
      .leftJoinAndSelect("patient.medicalHistory", "medicalHistory")
      .leftJoinAndSelect("wound.woundData", "woundData")
      .getResultList();

    console.log("ALL", _all);

    const appointments = await orm.em.find(Appointment, {
      doctor: doctor,
    });

    return _all;
  }
  return [];
}
