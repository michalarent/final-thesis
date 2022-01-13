import {
  getDoctor,
  getMedicalHistory,
  getPatient,
  getWounds,
} from "../../common/api";
import apiCall from "../../common/api/ApiCall";
import { Doctor } from "../../db/Doctor";
import Patient from "../../db/Patient";
import User from "../../db/User";
import { IUser } from "../../types/user";
import useLoaderSWR from "../useLoaderSWR";
import {
  getUserFromBackend,
  getPatientFromBackend,
  getDoctorFromBackend,
  getMedicalHistoryFromBackend,
  getWoundsFromBackend,
} from "./helpers";
import { ConsolidatedPatientInfo } from "./types";

async function fetchUserInfo() {
  const user = await getUserFromBackend();

  return user;
}

async function fetchPatientInfo(authId): Promise<ConsolidatedPatientInfo> {
  const patient = await getPatientFromBackend(authId);

  if (patient && patient.authId) {
    const medicalHistory = await getMedicalHistoryFromBackend(authId);
    const wounds = await getWoundsFromBackend(authId);

    return {
      isPatient: true,
      patient: {
        medicalHistory: medicalHistory,
        wounds: wounds,
        email: patient.email,
        name: patient.name,
        authId: patient.authId,
      },
    };
  } else {
    return {
      isPatient: false,
    };
  }
}

async function fetchDoctorInfo(authId: string) {
  const doctor = await getDoctorFromBackend(authId);

  if (doctor) {
    return {
      isDoctor: true,
      doctor: {
        doctorData: doctor.doctorData,
        email: doctor.email,
        name: doctor.name,
        authId: doctor.authId,
        appointments: doctor.appointments,
      },
    };
  } else {
    return {
      isDoctor: false,
    };
  }
}

export default function useUserInfo() {
  const user = useLoaderSWR(`/api/user`, fetchUserInfo);
  const patient = useLoaderSWR(
    user.status === "ready" ? `${user.value.user.authId}` : null,
    fetchPatientInfo
  );
  const doctor = useLoaderSWR(
    user.status === "ready" ? `${user.value.user.authId}` : null,
    fetchDoctorInfo
  );

  return { basics: user, patientData: patient, doctorData: doctor };
}
