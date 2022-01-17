import apiEndpoint, {
  createOrUpdateDoctor,
  updateUser,
} from "../../../common/api";
import { getDoctor } from "../../../services/DoctorServices";

export default apiEndpoint({
  GET: async ({ user }) => {
    const response = await getDoctor(user);

    return response;
  },
  POST: async ({ user, data }) => {
    createOrUpdateDoctor(user, data);
  },
});
