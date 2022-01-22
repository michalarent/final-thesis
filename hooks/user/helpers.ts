import apiCall from "../../common/api/ApiCall";
import { Chat } from "../../db/Chat";
import { Doctor } from "../../db/Doctor";
import Patient from "../../db/Patient";
import { Treatment } from "../../db/Treatment";
import { Wound } from "../../db/Wound";
import { ConsolidatedAppointment } from "../../helpers/doctor/types";
import { getAllPatientsByDoctor } from "../../services/DoctorServices";
import { IUser } from "../../types/user";
import { ConsolidatedWound } from "./types";

export async function getUserFromBackend(): Promise<{ user: IUser }> {
  return await apiCall("/api/user", "GET");
}

export async function getPatientFromBackend(authId: string): Promise<Patient> {
  return await apiCall(`/api/patient?user=${authId}`, "GET");
}

export async function getDoctorFromBackend(authId: string): Promise<Doctor> {
  return await apiCall(`/api/doctor?user=${authId}`, "GET");
}

export async function getMedicalHistoryFromBackend(
  authId: string
): Promise<any> {
  return await apiCall(`/api/patient/medical_history?user=${authId}`, "GET");
}

export async function getWoundsFromBackend(
  authId: string
): Promise<ConsolidatedWound[]> {
  return await apiCall(`/api/patient/wound?user=${authId}`, "GET");
}

export async function deleteWoundFromBackend(
  authId: string,
  woundId: number
): Promise<any> {
  return await apiCall(
    `/api/patient/wound?authId=${authId}&woundId=${woundId}`,
    "DELETE"
  );
}

export async function getDoctorsAppointmentsFromBackend(
  authId: string
): Promise<ConsolidatedAppointment[]> {
  return await apiCall(`/api/doctor/appointment?user=${authId}`, "GET");
}

export async function getDoctorsRelatedToPatientFromBackend(
  patientId: string
): Promise<Doctor[]> {
  return await apiCall(`/api/patient/doctors?user=${patientId}`, "GET");
}

export async function getAllPatientsByDoctorFromBackend(
  doctorId: string
): Promise<{ patient: Patient; appointments: ConsolidatedAppointment[] }[]> {
  return await apiCall(`/api/doctor/patients?user=${doctorId}`, "GET");
}

export async function getPatientChatsFromBackend(
  authId: string
): Promise<Chat[]> {
  return await apiCall(`/api/patient/chats?user=${authId}`, "GET");
}

export async function getDoctorChatsFromBackend(
  authId: string
): Promise<Chat[]> {
  return await apiCall(`/api/doctor/chats?user=${authId}`, "GET");
}

export async function getDoctorTreatmentsFromBackend(
  authId: string
): Promise<Treatment[]> {
  return await apiCall(`/api/doctor/treatment/all?user=${authId}`, "GET");
}

export async function removeTreatmentFromBackend(treatmentId: number) {
  return await apiCall(
    `/api/doctor/treatment?treatmentId=${treatmentId}`,
    "DELETE"
  );
}
