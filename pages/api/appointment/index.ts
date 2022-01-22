import apiEndpoint from "../../../common/api";
import {
  addAppointment,
  deleteAppointment,
  getAppointments,
} from "../../../services/AppointmentServices";

export default apiEndpoint({
  GET: async ({ user }) => {
    const response = await getAppointments(user);
    return response;
  },
  POST: async ({ authId, woundId, requestedDoctor, data }) => {
    const response = await addAppointment(
      authId,
      woundId,
      requestedDoctor,
      data
    );

    return response;
  },
  DELETE: async ({ appointmentId }) => {
    const response = await deleteAppointment(appointmentId);
    return response;
  },
});
