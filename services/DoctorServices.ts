import { MikroORM } from "@mikro-orm/core";
import { EntityManager, PostgreSqlDriver } from "@mikro-orm/postgresql";
import _ from "lodash";
import failwith from "../common/util/failwith";

import { getOrm } from "../db";
import { Appointment } from "../db/Appointment";
import { Chat } from "../db/Chat";
import { ChatMessage } from "../db/ChatMessage";
import { Doctor } from "../db/Doctor";
import Patient from "../db/Patient";
import { Treatment } from "../db/Treatment";
import TreatmentMedication from "../db/TreatmentMedication";
import { Wound } from "../db/Wound";
import WoundFormData from "../db/WoundFormData";
import { getAppointments } from "./AppointmentServices";

export async function isDoctor(authId: string): Promise<boolean> {
  const orm = await getOrm();
  const doctor = await orm.em.findOne(Doctor, { authId });

  if (!doctor?.authId) {
    console.log("is no doctore");
    return false;
  }
  return true;
}

export async function getDoctor(authId: string): Promise<Doctor> {
  if (!authId) return null;

  const orm = await getOrm();
  const doctor = await orm.em.findOne(Doctor, { authId });

  if (!doctor) {
    return null;
  }
  return doctor;
}

export async function createOrUpdateDoctor(
  user: Partial<{ authId: string }>,
  userInfo: any
) {
  const orm = await getOrm();
  const doctor = await getDoctor(user.authId);
  if (doctor) {
    doctor.doctorData = userInfo;
    await orm.em.persistAndFlush(doctor);
  } else {
    const newDoctor = orm.em.create(Doctor, {
      ...user,
      doctorData: userInfo,
    });
    await orm.em.persistAndFlush(newDoctor);
  }
}

export async function getAllDoctors(): Promise<Doctor[]> {
  const orm = await getOrm();
  const doctors = await orm.em.find(Doctor, {});
  return doctors;
}

export async function getDoctorChats(authId: string) {
  const orm = await getOrm();
  const doctor = await orm.em.findOne(Doctor, {
    authId,
  });
  if (!doctor) failwith("Doctor not found");
  const chats = await orm.em.find(Chat, {
    doctor: doctor,
  });
  const qb = orm.em.createQueryBuilder(ChatMessage, "chat");

  let finalChats = [];

  for (const chat of chats) {
    const messages = await qb.where({ chat: chat }).getResultList();
    const lastMessage = messages[messages.length - 1];
    finalChats.push({
      ...chat,
      messages,
      lastMessage,
    });
  }

  return finalChats;
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

    const appointments = await orm.em.find(Appointment, {
      doctor: doctor,
    });

    return _all.flatMap((appointment) => ({
      id: appointment.id,
      date: appointment.date,
      wound: appointment.wound,
      patient: appointment.wound.patient,
      images: appointment.images,
    }));
  }
}

export async function getDoctorTreatments(authId: string) {
  const orm = await getOrm();
  const doctor = await orm.em.findOne(Doctor, {
    authId,
  });
  if (!doctor) failwith("Doctor not found");
  const treatments = await orm.em.find(Treatment, {
    doctor: doctor,
  });

  const qb = orm.em.createQueryBuilder(Treatment, "treatment");

  let finalTreatments = [];

  for (const treatment of treatments) {
    const treatmentMedications = await qb
      .select("*")
      .where({ id: treatment.id })
      .leftJoinAndSelect("treatmentMedications", "treatmentMedications")
      .leftJoinAndSelect("treatmentMedications.medication", "medication")
      .leftJoinAndSelect("wound", "wound")

      .getResult();
    finalTreatments.push(treatmentMedications);
  }

  return finalTreatments;
}

export async function getAllPatientsByDoctor(
  doctorAuthid: string
): Promise<any[]> {
  const doctor = await getDoctor(doctorAuthid);
  if (!doctor) {
    failwith("Doctor not found!");
  }
  const appointments = await getDoctorAppointments(doctorAuthid);
  const patients = appointments.map(async (appointment) => ({
    patient: appointment.patient,
    appointments: await getAppointments(appointment.patient.authId),
  }));

  const _patients = await Promise.all(patients);

  return _.uniqBy(_patients, (p) => p.patient.authId);
}
