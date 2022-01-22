import apiEndpoint from "../../../../common/api";
import {
  AddTreatmentMedication,
  RemoveTreatmentMedication,
  UpdateTreatmentMedication,
} from "../../../../services/TreatmentMedicationServices";
import { getTreatment } from "../../../../services/TreatmentServices";

export default apiEndpoint({
  PUT: async ({ treatmentId, data }, { user }) => {
    const response = await UpdateTreatmentMedication(treatmentId, data);
    return response;
  },
  POST: async ({ treatmentId, data }, { user }) => {
    const response = await AddTreatmentMedication(treatmentId, data);
    return response;
  },
  DELETE: async ({ treatmentId, data }, { user }) => {
    const response = await RemoveTreatmentMedication(treatmentId, data);
    return response;
  },
});
