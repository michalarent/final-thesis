import apiEndpoint from "../../../common/api";
import {
  addAppointment,
  deleteAppointment,
  getAppointments,
} from "../../../services/AppointmentServices";
import { getAppointmentsForWound } from "../../../services/WoundServices";

export default apiEndpoint({
  GET: async ({ woundId }) => {
    const response = await getAppointmentsForWound(woundId);
    return response;
  },
});
