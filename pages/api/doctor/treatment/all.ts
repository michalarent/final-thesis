import { getDoctorTreatments } from "../../../../services/DoctorServices";
import apiEndpoint from "../../../../common/api";

export default apiEndpoint({
  GET: async ({ user }) => {
    const response = await getDoctorTreatments(user);

    return response;
  },
});
