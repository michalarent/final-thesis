import apiEndpoint from "../../../common/api";
import failwith from "../../../common/util/failwith";
import {
  createMedication,
  deleteMedication,
  getAllMedications,
  getMedication,
} from "../../../services/MedicationServices";

export default apiEndpoint({
  GET: async () => {
    const response = await getAllMedications();

    return response;
  },
});
