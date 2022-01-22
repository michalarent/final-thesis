import apiEndpoint from "../../../common/api";
import { getPatient } from "../../../services/PatientServices";

export default apiEndpoint({
  GET: async ({ user }) => {
    const response = await getPatient(user);

    return response;
  },
});
