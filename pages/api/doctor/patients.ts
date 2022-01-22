import apiEndpoint from "../../../common/api";

import failwith from "../../../common/util/failwith";
import {
  getAllPatientsByDoctor,
  getDoctorAppointments,
  isDoctor,
} from "../../../services/DoctorServices";

export default apiEndpoint({
  GET: async ({ user }) => {
    const response = await getAllPatientsByDoctor(user);
    return response;
  },
});
