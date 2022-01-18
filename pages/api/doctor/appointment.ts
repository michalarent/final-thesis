import apiEndpoint, {
  createOrUpdateDoctor,
  updateUser,
} from "../../../common/api";
import { getDoctorAppointments } from "../../../services/DoctorServices";

export default apiEndpoint({
  GET: async ({ user }) => {
    const response = await getDoctorAppointments(user);

    return response;
  },
});
