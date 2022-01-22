import apiEndpoint from "../../../common/api";
import failwith from "../../../common/util/failwith";
import {
  getMedicalHistory,
  isPatient,
  updateOrCreateMedicalHistory,
} from "../../../services/PatientServices";

export default apiEndpoint({
  POST: async (formData: any, { user }) => {
    const { data } = formData;
    const response = await updateOrCreateMedicalHistory(user.authId, data);

    return response;
  },
  GET: async ({ user }) => {
    const _isPatient = await isPatient(user);
    if (_isPatient) {
      const response = await getMedicalHistory(user);
      return response;
    } else {
      failwith(
        `Error @ /api/patient/medical_history || getMedicalHistory() || Props: ${user} `
      );
    }
  },
});
