import apiEndpoint from "../../../common/api";
import { getAppointment } from "../../../services/AppointmentServices";

export default apiEndpoint({
  GET: async ({ appointmentId }: { appointmentId: number }) => {
    const response = await getAppointment(appointmentId);
    return response;
  },
});
