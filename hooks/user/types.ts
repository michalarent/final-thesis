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
import PatientMedicalHistory from "../../db/PatientMedicalHistory";

export type ConsolidatedWound = {
  woundId: number;
  woundDataId: number;
  appointments: Appointment[];
  woundLocation: WoundLocation;
  woundSize: WoundSize;
  woundStage: WoundStage;
  woundStatus: WoundStatus;
  woundSeverity: WoundSeverity;
  woundSource: WoundSource;
  woundType: WoundType;
};

export type ConsolidatedPatientInfo = {
  isPatient: boolean;
  patient?: {
    authId: string;
    email: string;
    medicalHistory: PatientMedicalHistory;
    name: string;
    wounds: ConsolidatedWound[];
  };
};
