import apiEndpoint from "../../../common/api";
import { getPatient, getPatientChats } from "../../../services/PatientServices";

export default apiEndpoint({
  GET: async ({ user }) => {
    const response = await getPatientChats(user);

    return response;
  },
});
