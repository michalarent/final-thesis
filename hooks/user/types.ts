import {
  WoundLocation,
  WoundSeverity,
  WoundSize,
  WoundSource,
  WoundStage,
  WoundStatus,
  WoundType,
} from "../../data/types";
import { Appointment } from "../../db/Appointment";
import { Chat } from "../../db/Chat";
import { Doctor } from "../../db/Doctor";
import Patient from "../../db/Patient";
import PatientMedicalHistory from "../../db/PatientMedicalHistory";
import TimelineEvent from "../../db/TimelineEvent";
import { Treatment } from "../../db/Treatment";
import { ConsolidatedAppointment } from "../../helpers/doctor/types";
import { MedicationType } from "../../types/medication";

export type ConsolidatedWound = {
  woundId: number;
  woundDataId: number;
  appointments: ConsolidatedAppointment[];

  woundLocation: WoundLocation;
  woundSize: WoundSize;
  woundStage: WoundStage;
  woundStatus: WoundStatus;
  woundSeverity: WoundSeverity;
  woundSource: WoundSource;
  woundType: WoundType;

  patient: Patient;
};

export type ConsolidatedPatientInfo = {
  isPatient: boolean;
  patient?: {
    doctors: Doctor[];
    authId: string;
    email: string;
    chats: Chat[];
    medicalHistory: PatientMedicalHistory;
    name: string;
    wounds: ConsolidatedWound[];
  };
};

export type ConsolidatedDoctorInfo = {
  isDoctor: boolean;
  doctor?: {
    authId: string;
    appointments: ConsolidatedAppointment[];
    doctorData: Record<string, any>;
    name: string;
    email: string;
    chats: Chat[];
    treatments: Treatment[];
    patients: {
      patient: Patient;
      appointments: ConsolidatedAppointment[];
    }[];
  };
};

export type ConsolidatedTreatment = {
  id: number;
  doctor: {
    authId: string;
    name: string;
    doctorData: any;
  };
  timeline: any;
  treatmentMedications: {
    dosage: string;
    medication: MedicationType;
    prescription: any;
  }[];
  wound: ConsolidatedWound;
  createdAt: string;
  appointments: ConsolidatedAppointment[];
  timelineEvents: TimelineEvent[];
};
