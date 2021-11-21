import apiEndpoint, {
  createOrUpdateDoctor,
  getDoctor,
  updateUser,
} from "../../../common/api";

export default apiEndpoint({
  GET: async ({ user }) => {
    console.log(user);
    const response = await getDoctor(user);
    console.log("Doctor", response);
    return response;
  },
  POST: async ({ user, data }) => {
    createOrUpdateDoctor(user, data);
  },
});
