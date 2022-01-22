import apiEndpoint from "../../../../common/api";
import apiCall from "../../../../common/api/ApiCall";
import User from "../../../../db/User";
import {
  addTreatment,
  removeTreatment,
} from "../../../../services/TreatmentServices";

export default apiEndpoint({
  POST: async ({ doctorId, woundId, medications }) => {
    const response = await addTreatment(doctorId, woundId, medications);
    return response;
  },
  DELETE: async ({ treatmentId }, { user }) => {
    const response = await removeTreatment(user.authId, treatmentId);
    return response;
  },
});
