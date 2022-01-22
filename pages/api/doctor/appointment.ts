import apiEndpoint from "../../../common/api";

import failwith from "../../../common/util/failwith";
import {
  getDoctorAppointments,
  isDoctor,
} from "../../../services/DoctorServices";

export default apiEndpoint({
  GET: async ({ user }) => {
    const _isDoctor = await isDoctor(user);
    if (_isDoctor) {
      const response = await getDoctorAppointments(user);
      return response;
    } else {
      failwith(
        `Error @ /api/doctor/appointment || getDoctorAppointments() || Props: ${user} `
      );
    }
  },
});
