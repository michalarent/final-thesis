import apiEndpoint from "../../../common/api";
import failwith from "../../../common/util/failwith";
import {
  createMedication,
  deleteMedication,
  getMedication,
  updateMedication,
} from "../../../services/MedicationServices";

export default apiEndpoint({
  GET: async ({ id }) => {
    const response = await getMedication(id);

    return response;
  },
  POST: async ({ addedMedication }) => {
    const response = await createMedication(addedMedication);
    return response;
  },
  DELETE: async ({ id }) => {
    await deleteMedication(id);
  },
  PUT: async ({ medication }) => {
    const response = await updateMedication(medication);
    return response;
  },
});
