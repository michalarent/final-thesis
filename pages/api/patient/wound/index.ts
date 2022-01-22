import apiEndpoint from "../../../../common/api";
import {
  getWounds,
  addWound,
  deleteWound,
} from "../../../../services/WoundServices";

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
    await deleteWound(authId, woundId);
  },
});
