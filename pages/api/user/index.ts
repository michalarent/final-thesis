import apiEndpoint from "../../../common/api";

export default apiEndpoint({
  GET: async (_: void, { user }) => ({ user }),
});
