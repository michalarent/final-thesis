import apiEndpoint from "../../../common/api";
import { getAllDoctors } from "../../../services/DoctorServices";

export default apiEndpoint({
  GET: async () => {
    return getAllDoctors();
  },
});
