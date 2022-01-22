import apiCall from "../common/api/ApiCall";

import { MedicationType } from "../types/medication";
import useLoaderSWR, { Loader } from "./useLoaderSWR";

async function fetchMedications(): Promise<MedicationType[]> {
  const response: MedicationType[] = await apiCall(
    "/api/medication/all",
    "GET"
  );
  return response;
}

export default function useMedications(): Loader<MedicationType[]> {
  const _medications: Loader<MedicationType[]> = useLoaderSWR(
    "/api/medications",
    fetchMedications
  );

  return _medications;
}
