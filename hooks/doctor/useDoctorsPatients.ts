import apiCall from "../../common/api/ApiCall";
import Patient from "../../db/Patient";
import useLoaderSWR from "../useLoaderSWR";

export async function fetchPatients() {
  const response: Patient[] = await apiCall("/api/doctor/patients", "GET");
  return response;
}

export default function useDoctorsPatients(doctorAuthId: string) {
  const patients = useLoaderSWR(
    `/api/doctor/${doctorAuthId}/patients`,
    fetchPatients
  );

  return patients;
}
