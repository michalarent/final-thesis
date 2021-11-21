import apiEndpoint, { updateUser } from "../../../common/api";

export default apiEndpoint({
  GET: async (_: void, { user }) => ({ user }),
  POST: async ({ user, data }) => {
    console.log(user);
    console.log(data);
    updateUser(user.authId, data);
  },
});
