import Image from "../../db/Image";
import Patient from "../../db/Patient";
import PatientMedicalHistory from "../../db/PatientMedicalHistory";
import { ConsolidatedWound } from "../../hooks/user/types";

export type ConsolidatedPatient = {
  authId: string;
  email: string;
  medicalHistory: PatientMedicalHistory;
  name: string;
};

export type ConsolidatedAppointment = {
  wound: ConsolidatedWound;
  patient: ConsolidatedPatient;
  images: Image[];
};
