import apiEndpoint from "../../../common/api";
import { getTreatment } from "../../../services/TreatmentServices";

export default apiEndpoint({
  GET: async ({ id }) => {
    console.log("BIG BRAINS");
    const response = await getTreatment(id);
    return response;
  },
});
