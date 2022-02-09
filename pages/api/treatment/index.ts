import apiEndpoint from "../../../common/api";
import { isDoctor } from "../../../services/DoctorServices";
import {
  getTreatment,
  removeTreatment,
} from "../../../services/TreatmentServices";

export default apiEndpoint({
  GET: async ({ id }) => {
    const response = await getTreatment(id);
    return response;
  },
  DELETE: async ({ id }, { user }) => {
    const _isDoctor = await isDoctor(user.authId);
    console.log(id);

    if (_isDoctor) {
      const response = await removeTreatment(id, user.authId);
      return response;
    }
  },
});
