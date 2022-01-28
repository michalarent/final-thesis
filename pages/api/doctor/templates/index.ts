import apiEndpoint from "../../../../common/api";
import {
  createExaminationTemplate,
  getAllExaminationTemplates,
} from "../../../../services/DoctorServices";

export default apiEndpoint({
  GET: async (_, { user }) => {
    return getAllExaminationTemplates(user.authId);
  },
  POST: async ({ title, description, data }, { user }) => {
    createExaminationTemplate(title, description, data, user.authId);
  },
});
