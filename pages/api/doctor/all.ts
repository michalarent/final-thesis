import apiEndpoint, {
  createOrUpdateDoctor,
  getAllDoctors,
  getDoctor,
  updateUser,
} from "../../../common/api";

export default apiEndpoint({
  GET: async () => {
    return getAllDoctors();
  },
});
