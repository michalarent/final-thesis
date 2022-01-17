import apiEndpoint, { getPatient } from "../../../common/api";
import { getDoctorsRelatedToPatient } from "../../../services/PatientServices";

export default apiEndpoint({
  GET: async ({ user }) => {
    console.log(user);
    const response = await getDoctorsRelatedToPatient(user);

    return response;
  },
});
