import apiEndpoint, {
  getMedicalHistory,
  updateOrCreateMedicalHistory,
} from "../../../common/api";

export default apiEndpoint({
  POST: async (formData: any, { user }) => {
    const { data } = formData;
    const response = await updateOrCreateMedicalHistory(user.authId, data);
    console.log(response);
    return response;
  },
  GET: async ({ user }) => {
    const response = await getMedicalHistory(user);
    console.log(response);
    return response;
  },
});
