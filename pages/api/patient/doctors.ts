import apiEndpoint from "../../../common/api";
import failwith from "../../../common/util/failwith";
import {
  getDoctorsRelatedToPatient,
  isPatient,
} from "../../../services/PatientServices";

export default apiEndpoint({
  GET: async ({ user }) => {
    const _isPatient = await isPatient(user);
    if (_isPatient) {
      const response = await getDoctorsRelatedToPatient(user);
      return response;
    } else {
      failwith(
        `Error @ /api/patient/doctors || getDoctorsRelatedToPatient() || Props: ${user} `
      );
    }
  },
});
