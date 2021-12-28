import apiEndpoint, { getAppointment } from "../../../common/api";

export default apiEndpoint({
  GET: async (appointmentId: string) => {
    const response = await getAppointment(appointmentId.appointmentId);
    return response;
  },
});
