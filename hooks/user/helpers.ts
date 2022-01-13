import apiCall from "../../common/api/ApiCall";
import { Doctor } from "../../db/Doctor";
import Patient from "../../db/Patient";
import { Wound } from "../../db/Wound";
import { IUser } from "../../types/user";
import { ConsolidatedWound } from "./types";

export async function getUserFromBackend(): Promise<IUser> {
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
