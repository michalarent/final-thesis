import apiEndpoint, {
  createOrUpdateDoctor,
  getDoctor,
  updateUser,
} from "../../../common/api";

export default apiEndpoint({
  GET: async ({ user }) => {
    const response = await getDoctor(user);

    return response;
  },
  POST: async ({ user, data }) => {
    createOrUpdateDoctor(user, data);
  },
});
