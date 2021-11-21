import apiEndpoint, { getPatient } from "../../../common/api";

export default apiEndpoint({
  GET: async ({ user }) => {
    console.log(user);
    const response = await getPatient(user);

    return response;
  },
});
