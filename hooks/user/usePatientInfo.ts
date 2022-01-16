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
  getDoctorsAppointmentsFromBackend,
} from "./helpers";
import { ConsolidatedPatientInfo } from "./types";

async function fetchUserInfo() {
  const user = await getUserFromBackend();

  return user;
}

async function fetchPatientInfo(authId): Promise<ConsolidatedPatientInfo> {
  const parsedId = authId.split("patient_")[1];
  const patient = await getPatientFromBackend(parsedId);

  if (patient && patient.authId) {
    const medicalHistory = await getMedicalHistoryFromBackend(parsedId);
    const wounds = await getWoundsFromBackend(parsedId);

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
  const parsedId = authId.split("doctor_")[1];
  const doctor = await getDoctorFromBackend(parsedId);

  if (doctor) {
    const appointments = await getDoctorsAppointmentsFromBackend(parsedId);
    return {
      isDoctor: true,
      doctor: {
        doctorData: doctor.doctorData,
        email: doctor.email,
        name: doctor.name,
        authId: doctor.authId,
        appointments,
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
    user.status === "ready" ? `patient_${user.value.user.authId}` : null,
    fetchPatientInfo
  );
  const doctor = useLoaderSWR(
    user.status === "ready" ? `doctor_${user.value.user.authId}` : null,
    fetchDoctorInfo
  );

  console.log(doctor);

  return { basics: user, patientData: patient, doctorData: doctor };
}
