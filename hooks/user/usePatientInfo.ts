import { Chat } from "../../db/Chat";
import { getChatMessages } from "../../services/ChatServices";
import {
  getAllPatientsByDoctor,
  getDoctorChats,
} from "../../services/DoctorServices";
import { getPatientChats } from "../../services/PatientServices";
import { IUser } from "../../types/user";
import useLoaderSWR from "../useLoaderSWR";
import {
  getUserFromBackend,
  getPatientFromBackend,
  getDoctorFromBackend,
  getMedicalHistoryFromBackend,
  getWoundsFromBackend,
  getDoctorsAppointmentsFromBackend,
  getDoctorsRelatedToPatientFromBackend,
  getAllPatientsByDoctorFromBackend,
  getPatientChatsFromBackend,
  getDoctorChatsFromBackend,
  getDoctorTreatmentsFromBackend,
} from "./helpers";
import { ConsolidatedDoctorInfo, ConsolidatedPatientInfo } from "./types";

async function fetchUserInfo(): Promise<IUser> {
  const user = await getUserFromBackend();
  // @ts-ignore

  console.log(user);
  //@ts-ignore
  return user;
}

async function fetchPatientInfo(authId): Promise<ConsolidatedPatientInfo> {
  const parsedId = authId.split("patient_")[1];
  const patient = await getPatientFromBackend(parsedId);

  if (patient && patient.authId) {
    const _medicalHistory = getMedicalHistoryFromBackend(parsedId);
    const _wounds = getWoundsFromBackend(parsedId);
    const _doctors = getDoctorsRelatedToPatientFromBackend(parsedId);
    const _chats = getPatientChatsFromBackend(parsedId);

    const [medicalHistory, wounds, doctors, chats] = await Promise.all([
      _medicalHistory,
      _wounds,
      _doctors,
      _chats,
    ]);

    const { email, name, authId } = patient;

    return {
      isPatient: true,
      patient: {
        doctors: doctors,
        medicalHistory: medicalHistory,
        wounds: wounds,
        chats,
        email,
        name,
        authId,
      },
    };
  } else {
    return {
      isPatient: false,
    };
  }
}

async function fetchDoctorInfo(
  authId: string
): Promise<ConsolidatedDoctorInfo> {
  const parsedId = authId.split("doctor_")[1];
  const doctor = await getDoctorFromBackend(parsedId);

  if (doctor.authId) {
    const _appointments = getDoctorsAppointmentsFromBackend(parsedId);
    const _patients = getAllPatientsByDoctorFromBackend(parsedId);
    const _chats = getDoctorChatsFromBackend(parsedId);
    const _treatments = getDoctorTreatmentsFromBackend(parsedId);

    const [appointments, patients, chats, treatments] = await Promise.all([
      _appointments,
      _patients,
      _chats,
      _treatments,
    ]);

    const { doctorData, email, name, authId } = doctor;
    return {
      isDoctor: true,
      doctor: {
        doctorData,
        email,
        name,
        authId,
        chats,
        appointments,
        patients,
        treatments,
      },
    };
  } else {
    return {
      isDoctor: false,
    };
  }
}

export default function useUserInfo() {
  const user = useLoaderSWR(`/api/user/2`, fetchUserInfo);

  const patient = useLoaderSWR(
    user.status === "ready" ? `patient_${user.value.user.authId}` : null,
    fetchPatientInfo
  );
  const doctor = useLoaderSWR(
    user.status === "ready" ? `doctor_${user.value.user.authId}` : null,
    fetchDoctorInfo
  );

  return { basics: user, patientData: patient, doctorData: doctor };
}
