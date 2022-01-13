import apiEndpoint, {
  addWound,
  createOrUpdateDoctor,
  deleteWound,
  getDoctor,
  getWounds,
  updateUser,
} from "../../../../common/api";

export default apiEndpoint({
  GET: async ({ user }) => {
    const response = await getWounds(user);

    return response;
  },
  POST: async ({ user, data }) => {
    const response = await addWound(user.authId, data);
    return response;
  },
  DELETE: async ({ authId, woundId }) => {
    console.log(woundId);
    console.log(authId);
    await deleteWound(authId, woundId);
  },
});
