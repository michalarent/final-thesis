import { getOrm } from "../db";
import { Doctor } from "../db/Doctor";
import { uniqBy } from "lodash";
import Patient from "../db/Patient";

import PatientMedicalHistory from "../db/PatientMedicalHistory";
import failwith from "../common/util/failwith";
import { getUser } from "./UserServices";
import patient from "../pages/api/patient";
import { Chat } from "../db/Chat";
import { ChatMessage } from "../db/ChatMessage";

export async function isPatient(authId: string): Promise<boolean> {
  const orm = await getOrm();
  const patient = await orm.em.findOne(Patient, { authId });
  if (!patient) return false;
  return true;
}

export async function getPatient(authId: string): Promise<Patient> {
  const orm = await getOrm();
  if (!authId) failwith("authId is required");
  const patient = await orm.em.findOne(Patient, {
    authId,
  });

  return patient;
}

export async function getPatientChats(authId: string) {
  const orm = await getOrm();
  const patient = await orm.em.findOne(Patient, {
    authId,
  });
  if (!patient) failwith("Patient not found");
  const chats = await orm.em.find(Chat, {
    patient: patient,
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

export async function getDoctorsRelatedToPatient(patientId: string) {
  const orm = await getOrm();
  const _all = await orm.em
    .createQueryBuilder(Doctor, "doctor")
    .where({ appointments: { wound: { patient: { authId: patientId } } } })
    .getResultList();

  return _all;
}

export async function getMedicalHistory(authId: string): Promise<any> {
  const orm = await getOrm();

  const patient = await getPatient(authId);

  if (!patient) {
    failwith("Patient not found!");
  } else {
    if (patient.medicalHistory) {
      return await orm.em.findOne(PatientMedicalHistory, {
        id: patient.medicalHistory as any,
      });
    }
  }
}

export async function updateOrCreateMedicalHistory(
  authId: string,
  medicalHistory: any
): Promise<any> {
  const user = await getUser(authId);
  const orm = await getOrm();
  if (!user) {
    failwith("User not found!");
  } else {
    let patient = await getPatient(authId);

    if (!patient) {
      try {
        const newPatient = orm.em.create(Patient, {
          email: user.email,
          name: user.name,
          authId,
        });

        const newMedicalHistory = orm.em.create(PatientMedicalHistory, {
          patient: newPatient,
          ...medicalHistory,
        });
        await orm.em.persistAndFlush(newMedicalHistory);

        const updatePatient = await getPatient(authId);
        updatePatient.medicalHistory = newMedicalHistory.id as any;

        await orm.em.persistAndFlush(updatePatient);

        return updatePatient;
      } catch (e) {
        failwith("Error creating medical history!");
      }
    } else {
      const newMedicalHistory = orm.em.create(PatientMedicalHistory, {
        patient: patient,
        ...medicalHistory,
      });

      await orm.em.persistAndFlush(newMedicalHistory);
      patient.medicalHistory = newMedicalHistory;
      await orm.em.persistAndFlush(patient);

      return patient.medicalHistory;
    }
  }
}
