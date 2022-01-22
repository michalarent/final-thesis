import apiEndpoint from "../../../common/api";
import {
  createOrUpdateDoctor,
  getDoctor,
} from "../../../services/DoctorServices";

export default apiEndpoint({
  GET: async ({ user }) => {
    const response = await getDoctor(user);

    return response;
  },
  POST: async ({ user, data }) => {
    createOrUpdateDoctor(user, data);
  },
});
