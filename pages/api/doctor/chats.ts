import apiEndpoint from "../../../common/api";
import { getDoctorChats } from "../../../services/DoctorServices";
import { getPatient, getPatientChats } from "../../../services/PatientServices";

export default apiEndpoint({
  GET: async ({ user }) => {
    const response = await getDoctorChats(user);

    return response;
  },
});
